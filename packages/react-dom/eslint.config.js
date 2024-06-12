import getSvagEslintBaseConfigs from 'svag-lint/configs/base.js'
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...getSvagEslintBaseConfigs({
    ignores: ['dist', 'volumes', 'node_modules', '.storybook'],
    console: true,
  }),
  {
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]
