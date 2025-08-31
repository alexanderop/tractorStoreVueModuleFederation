import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: [
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**'
  ],
  rules: {
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }]
  }
})