import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js, TypeScript, and import recommended configurations
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ),
  {
    // Apply to JavaScript/TypeScript and React files
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier,
      tailwindcss,
      import: importPlugin,
    },
    settings: {
      // Configure TypeScript import resolver to handle @/* aliases
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json', // Point to your tsconfig.json
        },
      },
    },
    rules: {
      // Prettier and Tailwind CSS rules (unchanged)
      'prettier/prettier': 'error',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',

      // Import/Export consistency rules
      'import/no-unresolved': ['error', { ignore: ['^@/*'] }], // Handle @/* aliases
      'import/no-duplicates': 'error', // Prevent duplicate imports
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.test.*', '**/*.spec.*'] },
      ], // Restrict devDependency imports
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal', // Treat @/* aliases in the internal group
            },
          ],
          'newlines-between': 'always', // Add newline between groups
          alphabetize: { order: 'asc', caseInsensitive: true }, // Sort imports alphabetically
        },
      ],
      'import/newline-after-import': 'error', // Ensure newline after imports
      'import/prefer-default-export': 'off', // Allow named exports (common in Next.js)
      'import/no-anonymous-default-export': ['warn', { allowObject: true }], // Warn on anonymous default exports
      'import/extensions': ['error', 'never', { ts: 'never', tsx: 'never' }], // Omit extensions for TypeScript files
    },
  },
];

export default eslintConfig;
