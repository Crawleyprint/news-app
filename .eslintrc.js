module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:jsx-a11y/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: ['react', 'react-hooks', 'jsx-a11y'],
	rules: {
		'react/prop-types': 0,
		'import/prefer-default-export': 'off',
	},
};
