module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    NSPasteboard: 'readonly',
    NSPasteboardTypeString: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {},
}
