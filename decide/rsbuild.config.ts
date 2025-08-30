import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginModuleFederation({
      name: 'decide',
      exposes: {
        './ProductPage': './src/ProductPage.vue',
      },
      shared: {
        vue: { singleton: true, eager: true },
      },
      dts: false, // Disable DTS to avoid TypeScript issues
    }),
  ],
  source: {
    entry: {
      index: './src/main.ts',
    },
  },
  server: {
    port: 5175,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  html: {
    template: './index.html',
  },
})