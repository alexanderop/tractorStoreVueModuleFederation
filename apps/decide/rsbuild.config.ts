import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginModuleFederation({
      name: 'decide',
      remotes: {
        checkout: 'checkout@http://localhost:3003/mf-manifest.json',
        explore: 'explore@http://localhost:3004/mf-manifest.json',
      },
      exposes: {
        './ProductPage': './src/ProductPage.vue',
      },
      shared: {
        'vue': { singleton: true, strictVersion: true, requiredVersion: '3.5.x', eager: true },
        'vue-router': { singleton: true, strictVersion: true, requiredVersion: '4.5.x' },
        'canvas-confetti': { singleton: true },
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
