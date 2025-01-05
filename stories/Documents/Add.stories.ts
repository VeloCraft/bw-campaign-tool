import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Add from '@/components/Documents/Add';

seed('Documents/Add');

const meta = {
  title: 'Documents/Add',
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
