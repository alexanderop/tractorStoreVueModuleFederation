import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginModuleFederation({
      name: 'explore',
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
        vue: { singleton: true, eager: true },
        'vue-router': { singleton: true, eager: true },
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