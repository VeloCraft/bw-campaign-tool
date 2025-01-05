import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Add from '@/components/Users/Add';

seed('Users/Add');

const meta = {
  title: 'Users/Add',
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
