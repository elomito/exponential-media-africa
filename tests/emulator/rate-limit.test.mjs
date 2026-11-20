import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { api, resetEmulators } from './helpers.mjs';

const payload = (index) => ({
  fullName: `Rate Limit ${index}`,
  businessEmail: `rate${index}@example.com`,
  companyName: 'Rate Co',
  phone: '+254700000000',
  industry: 'Retail',
  requiredServices: ['Media Buy'],
  estimatedBudget: 'KES 1M',
  projectTimeline: '1-3 months',
  projectDescription: 'Rate limit verification submission with enough detail.',
  consentAccepted: true,
});

// Requires a freshly started server: the inquiry limiter allows 6 requests per 10 minutes per path and IP.
test('inquiry submissions are rate limited with a Retry-After hint', async () => {
  await resetEmulators();

  const honeypot = await api('/api/inquiries', {
    method: 'POST',
    headers: { 'Idempotency-Key': randomUUID() },
    body: { ...payload('honeypot'), websiteHoneypot: 'bot' },
  });
  assert.equal(honeypot.status, 400, 'honeypot submissions are rejected');

  for (let index = 1; index <= 5; index += 1) {
    const response = await api('/api/inquiries', {
      method: 'POST',
      headers: { 'Idempotency-Key': randomUUID() },
      body: payload(index),
    });
    assert.equal(response.status, 201, `submission ${index} should be accepted within the limit`);
  }

  const limited = await api('/api/inquiries', {
    method: 'POST',
    headers: { 'Idempotency-Key': randomUUID() },
    body: payload(6),
  });
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0, 'Retry-After header is present');
});
