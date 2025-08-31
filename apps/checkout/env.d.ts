/// <reference types="vite/client" />

declare global {
  interface Window {
    getComponent: (name: string) => any
  }
}

export {}
