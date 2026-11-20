import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { adminDb, api, listCollection, readDoc, resetEmulators } from './helpers.mjs';

const validPayload = (overrides = {}) => ({
  fullName: 'Achieng Otieno',
  businessEmail: 'Achieng.Otieno@Example.COM',
  companyName: 'Savanna Retail Ltd',
  phone: '+254 712 345 678',
  industry: 'Retail & FMCG',
  requiredServices: ['Media Buy', 'Brand Activations'],
  estimatedBudget: 'KES 2M - 5M',
  projectTimeline: '1-3 months',
  projectDescription: 'We need an integrated launch campaign <script>alert(1)</script> across Nairobi and Nakuru.',
  consentAccepted: true,
  ...overrides,
});

let reference = null;
let validKey = null;

test.before(async () => {
  await resetEmulators();
});

test('malformed inquiries are rejected without persisting', async () => {
  const response = await api('/api/inquiries', {
    method: 'POST',
    headers: { 'Idempotency-Key': randomUUID() },
    body: validPayload({ consentAccepted: false }),
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await listCollection('inquiries'), []);
});

test('oversized payloads are rejected with 413', async () => {
  const response = await api('/api/inquiries', {
    method: 'POST',
    headers: { 'Idempotency-Key': randomUUID() },
    body: validPayload({ projectDescription: 'x'.repeat(20_000) }),
  });
  assert.equal(response.status, 413);
});

test('an idempotency key is required', async () => {
  const response = await api('/api/inquiries', { method: 'POST', body: validPayload() });
  assert.equal(response.status, 400);
});

test('a valid inquiry is normalized, persisted and returns a reference', async () => {
  const key = randomUUID();
  validKey = key;
  const response = await api('/api/inquiries', {
    method: 'POST',
    headers: { 'Idempotency-Key': key },
    body: validPayload(),
  });
  assert.equal(response.status, 201);
  assert.match(response.body.referenceCode, /^EMA-\d{4}-[A-Z0-9]{12}$/);
  reference = response.body.referenceCode;

  const saved = (await listCollection('inquiries')).find((entry) => entry.referenceCode === reference);
  assert.ok(saved, 'inquiry must be persisted');
  assert.equal(saved.businessEmail, 'achieng.otieno@example.com', 'email is lower-cased');
  assert.equal(saved.fullName, 'Achieng Otieno');
  assert.equal(saved.projectDescription.includes('<script>'), false, 'markup is stripped');
  assert.equal(saved.projectDescription.includes('alert(1)'), true, 'text content is preserved');
  assert.equal(saved.inquiryStatus, 'new');
  assert.equal(saved.consentAccepted, true);
  assert.ok(saved.createdAt, 'server timestamp is applied');

  const idempotency = await readDoc('_inquiry_idempotency', createHash('sha256').update(key).digest('hex'));
  assert.ok(idempotency, 'idempotency record is stored');
  assert.equal(idempotency.referenceCode, reference);
  assert.equal(JSON.stringify(idempotency).includes('achieng'), false, 'idempotency record holds no personal data');
  assert.ok(await readDoc('_inquiry_references', reference), 'reference index is stored');
});

test('retrying with the same key and payload is idempotent', async () => {
  const before = (await listCollection('inquiries')).length;
  const retry = await api('/api/inquiries', {
    method: 'POST',
    headers: { 'Idempotency-Key': validKey },
    body: validPayload(),
  });
  assert.equal(retry.status, 200);
  assert.equal(retry.body.referenceCode, reference);
  assert.equal((await listCollection('inquiries')).length, before, 'retry must not create a second inquiry');
});

test('reusing a key with different details conflicts', async () => {
  const before = (await listCollection('inquiries')).length;
  const conflict = await api('/api/inquiries', {
    method: 'POST',
    headers: { 'Idempotency-Key': validKey },
    body: validPayload({ fullName: 'Conflict Two' }),
  });
  assert.equal(conflict.status, 409);
  assert.equal((await listCollection('inquiries')).length, before);
  assert.equal((await listCollection('inquiries')).filter((entry) => entry.fullName === 'Conflict Two').length, 0);
});

test('newsletter enrollment stays disabled', async () => {
  const response = await api('/api/newsletter/validate', {
    method: 'POST',
    body: { email: 'person@example.com', consentAccepted: true },
  });
  assert.equal(response.status, 410);
});

test('audit records cannot be written by the inquiry route', async () => {
  assert.deepEqual(await listCollection('audit_logs'), []);
});
