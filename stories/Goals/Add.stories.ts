import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Add from '@/components/Goals/Add';

seed('Goals/Add');

const meta = {
  title: 'Goals/Add',
  component: Add,
} satisfies Meta<typeof Add>;

export default meta;
type Story = StoryObj<typeof Add>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
