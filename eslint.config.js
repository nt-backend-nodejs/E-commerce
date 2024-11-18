import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        // extends: ['airbnb-base', 'plugin:prettier/recommended'],
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
        rules: {
            'prefer-const': 'error',
            'no-unused-vars': 'warn',
            'no-console': 'error',
        },
    },
]
