import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin'

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    decide: 'decide@http://localhost:5175/mf-manifest.json',
    checkout: 'checkout@http://localhost:3003/mf-manifest.json',
    explore: 'explore@http://localhost:3004/mf-manifest.json',
  },
  shared: {
    'vue': { singleton: true, eager: true },
    'vue-router': { singleton: true, eager: true },
    'canvas-confetti': { singleton: true },
  },
})
