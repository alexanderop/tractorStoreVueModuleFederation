import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin'

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    decide: 'decide@http://localhost:5175/mf-manifest.json',
    checkout: 'checkout@http://localhost:3003/remoteEntry.js',
    explore: 'explore@http://localhost:3004/remoteEntry.js',
  },
  shared: {
    'vue': { singleton: true, eager: true },
    'vue-router': { singleton: true, eager: true },
  },
})
