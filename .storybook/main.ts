import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import tsconfig from '../tsconfig.json'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
const rootPath = path.resolve(__dirname, '..')

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    skipCompiler: true,
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    return mergeConfig(config, {
      optimizeDeps: {
        // include: ['@uinity/core'],
      },
      resolve: {
        alias: Object.fromEntries(
          Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
            key.replace('/*', ''),
            path.resolve(rootPath, value.replace('/*', '')),
          ])
        ),
      },
      plugins: [react(), svgr()],
      server: {
        host: true,
      },
      define: {
        'process.env': {
          NODE_ENV: 'development',
        },
      },
    })
  },
}
export default config
