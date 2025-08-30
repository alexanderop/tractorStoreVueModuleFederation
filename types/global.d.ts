declare global {
  interface Window {
    /** Returns a function that resolves the actual component */
    getComponent?: (id: string) => () => Promise<any>
  }
}

export {}