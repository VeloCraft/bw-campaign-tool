import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Admin from '@/components/Admin';

seed('Admin');

const meta = {
  title: 'Admin',
  component: Admin,
} satisfies Meta<typeof Admin>;

export default meta;
type Story = StoryObj<typeof Admin>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithUser = {
  args: {
    user: generate('user', { roles: ['admin'] }) as User,
  },
} satisfies Story;
