import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import List from '@/components/Users/List';

seed('Users/List');

const meta = {
  title: 'Users/List',
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithUser = {
  args: {
    user: generate('user', { roles: ['admin'] }) as User,
  },
} satisfies Story;
