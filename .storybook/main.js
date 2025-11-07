/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
};

export default config;
