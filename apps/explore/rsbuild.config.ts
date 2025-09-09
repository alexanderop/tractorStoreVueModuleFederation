import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginModuleFederation({
      name: 'explore',
      remotes: {
        checkout: 'checkout@http://localhost:3003/mf-manifest.json',
      },
      exposes: {
        './HomePage': './src/HomePage.vue',
        './CategoryPage': './src/CategoryPage.vue',
        './StoresPage': './src/StoresPage.vue',
        './Recommendations': './src/Recommendations.vue',
        './Header': './src/Header.vue',
        './Footer': './src/Footer.vue',
        './StorePicker': './src/StorePicker.vue',
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
    port: 3004,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  html: {
    template: './index.html',
  },
})
