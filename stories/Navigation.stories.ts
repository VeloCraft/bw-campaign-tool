import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Navigation from '@/components/Navigation';

seed('Navigation');

const meta = {
  title: 'Navigation',
  component: Navigation,
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof Navigation>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithActivePathname = {
  ...WithDefaults,
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/campaigns',
      },
    },
  },
} satisfies Story;
