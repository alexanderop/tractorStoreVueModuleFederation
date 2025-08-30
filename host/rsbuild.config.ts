import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import moduleFederationConfig from './module-federation.config'

export default defineConfig({
  plugins: [
    pluginVue({
      vueJsxOptions: {
        include: /\.(vue|jsx|tsx)$/,
      },
    }),
    pluginModuleFederation(moduleFederationConfig),
  ],
  server: {
    port: 3001,
  },
  html: {
    template: './public/index.html',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js', // Use the full build with template compiler
    },
  },
})
