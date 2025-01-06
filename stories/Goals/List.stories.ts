import type { Meta, StoryObj } from '@storybook/react';
import faker, { generate, seed } from '@/.storybook/faker';
import List from '@/components/Goals/List';

seed('Goals/List');

const meta = {
  title: 'Goals/List',
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    loading: false,
    goals: generate('goal', { count: 12 }) as Goal[],
  },
} satisfies Story;

export const WithLoading = {
  args: {
    loading: true,
    docId: faker.string.uuid(),
  },
} satisfies Story;
