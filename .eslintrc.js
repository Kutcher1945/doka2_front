module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "space-before-function-paren": "warn",
    "camelcase": "off",
    "no-unused-vars": "off",
    "prefer-const": "off"
  }
}
