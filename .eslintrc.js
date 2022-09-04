module.exports = {
  settings: {
    react: {
      pragma: 'React',
      version: '^18.2.0',
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['react-hooks', 'react', 'babel', 'import', 'eslint-plugin-import-helpers'],
  rules: {
    // eslint
    camelcase: 0,
    'no-shadow': 'off',
    'max-len': ['error', { 'code': 100, 'tabWidth': 2 }],
    'semi': [2, 'always'],
    'arrow-parens': [2, 'as-needed'],
    'consistent-return': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-case-declarations': 0,
    'no-mixed-operators': 0,
    'no-prototype-builtins': 0,
    'no-restricted-properties': 0,
    'no-return-assign': 0,
    'no-nested-ternary': 0,
    'no-unused-expressions': 0,
    'class-methods-use-this': 0,
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    // babel plugin
    'babel/no-unused-expressions': 0,
    // react plugin
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/button-has-type': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
    'react/react-in-jsx-scope': 'off',
    // jsx-a11y
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-associated-control': 0,
    // eslint-import-plugin
    'import-helpers/order-imports': [
      'error',
      {
        groups: [
          ['module', 'absolute'], '/^(assets|components|utils)/', 'parent', 'sibling',
        ],
        newlinesBetween: 'always',
      },
    ],
  },
};
