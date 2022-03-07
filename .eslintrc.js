module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 0,
    'no-useless-escape': 0,
    'vue/no-unused-components': 0,
    'prettier/prettier': [
      1,
      {
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        bracketSpacing: true,
        trailingComma: 'none',
        printWidth: 100,
        htmlWhitespaceSensitivity: 'ignore',
        tabWidth: 2
      }
    ]
  }
}
