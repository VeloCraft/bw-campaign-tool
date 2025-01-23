import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import index from '@/components/Tools/index';

seed('Tools/index');

const meta = {
  title: 'Tools/index',
  component: index,
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof index>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithUser = {
  args: {
    user: generate('user') as User,
  },
} satisfies Story;
