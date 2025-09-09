import { federation } from '@module-federation/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    origin: 'http://localhost:5175',
    port: 5175,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  base: 'http://localhost:5175',
  plugins: [
    vue(),
    federation({
      name: 'decide',
      manifest: true,
      remotes: {
        checkout: {
          type: 'module',
          name: 'checkout',
          entry: 'http://localhost:3003/mf-manifest.json',
        },
        explore: {
          type: 'module',
          name: 'explore',
          entry: 'http://localhost:3004/mf-manifest.json',
        },
      },
      exposes: {
        './ProductPage': './src/ProductPage.vue',
      },
      shared: {
        'vue': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '3.5.x',
        },
        'vue-router': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '4.5.x',
        },
        'canvas-confetti': {
          singleton: true,
        },
      },
    }),
  ],
  build: {
    target: 'chrome89',
  },
})
