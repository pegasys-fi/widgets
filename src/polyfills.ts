import { Buffer } from 'buffer'

declare global {
  interface Window {
    Buffer?: typeof Buffer
  }
}

if (typeof window !== 'undefined') {
  // WalletConnect relies on Buffer, so it must be polyfilled.
  if (!window.Buffer) {
    window.Buffer = Buffer
  }
}

export {}
