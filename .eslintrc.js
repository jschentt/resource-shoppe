module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended', // 添加 prettier 插件
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-return-assign': 0,
    'dot-notation': 0,
    'prefer-promise-reject-errors': 0,
    'no-plusplus': 0,
    'default-param-last': 0,
    'no-unused-expressions': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'guard-for-in': 0,
    'no-useless-escape': 0,
    'no-shadow': 0,
    'global-require': 0,
    'consistent-return': 0,
    'no-restricted-globals': 0,
    'no-restricted-syntax': 0,
    'vue/no-v-model-argument': 0,
    'vue/no-v-for-template-key': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'vue/no-multiple-template-root': 0,
    'vue/no-mutating-props': 0,
    'vue/multi-word-component-names': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
}
