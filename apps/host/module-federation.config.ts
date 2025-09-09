import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin'

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    decide: 'decide@http://localhost:5175/mf-manifest.json',
    checkout: 'checkout@http://localhost:3003/mf-manifest.json',
    explore: 'explore@http://localhost:3004/mf-manifest.json',
  },
  shared: {
    'vue': { singleton: true, strictVersion: true, requiredVersion: '3.5.x', eager: true },
    'vue-router': { singleton: true, strictVersion: true, requiredVersion: '4.5.x' },
    'canvas-confetti': { singleton: true },
  },
})
