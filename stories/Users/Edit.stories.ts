import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Edit from '@/components/Users/Edit';

seed('Users/Edit');

const meta = {
  title: 'Users/Edit',
  component: Edit,
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof Edit>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
