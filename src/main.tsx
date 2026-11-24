import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

(window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
  window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
};

const origConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const msg = args.map((a) => String(a)).join(' ');
  if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
    origConsoleError.apply(console, args);
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    return;
  }
  if (
    msg.includes('@firebase/firestore') &&
    msg.includes('Could not reach Cloud Firestore backend')
  ) {
    console.warn(...args);
    return;
  }
  origConsoleError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(<App />);
