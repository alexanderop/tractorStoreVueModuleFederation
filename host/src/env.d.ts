/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly VITE_DECIDE_URL: string
  readonly VITE_CHECKOUT_URL: string
  readonly VITE_EXPLORE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
