import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const toPath = (filePath: string) => path.join(process.cwd(), filePath);

const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          [toPath('hooks/useFirestoreCollection')]: toPath(
            '.storybook/useFirestoreCollection.ts',
          ),
          [toPath('hooks/useFirestoreDoc')]: toPath(
            '.storybook/useFirestoreDoc.ts',
          ),
        },
      },
    };
  },
} satisfies StorybookConfig;

export default config;
