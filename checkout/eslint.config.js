import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['*.js', '*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  {
    ignores: ['dist/**/*', 'node_modules/**/*', '**/*.d.ts']
  }
]