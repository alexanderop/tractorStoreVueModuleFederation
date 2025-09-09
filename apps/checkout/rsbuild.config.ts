import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginModuleFederation({
      name: 'checkout',
      remotes: {
        explore: 'explore@http://localhost:3004/mf-manifest.json',
      },
      exposes: {
        './CartPage': './src/CartPage.vue',
        './Checkout': './src/Checkout.vue',
        './Thanks': './src/Thanks.vue',
        './AddToCart': './src/AddToCart.vue',
        './MiniCart': './src/MiniCart.vue',
      },
      shared: {
        'vue': { singleton: true, eager: true },
        'vue-router': { singleton: true, eager: true },
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
    port: 3003,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  html: {
    template: './index.html',
  },
})
