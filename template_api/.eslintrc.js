module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parseOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};
