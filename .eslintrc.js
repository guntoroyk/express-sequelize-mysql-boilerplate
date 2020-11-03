module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier', 'module-resolver'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'func-names': 'off', // allow unamed function expressions
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
        'no-plusplus': [2, { allowForLoopAfterthoughts: true }], // allow ++ or -- on for loop
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['~', './src']],
                extensions: ['.ts', '.js', '.jsx', '.json'],
            },
        },
    },
};
