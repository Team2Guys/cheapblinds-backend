export default [
  {
    ignores: ['generated/**'], // ignore the "generated" directory at the root
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn'
      // Formatting handled by Prettier
    }
  }
];
