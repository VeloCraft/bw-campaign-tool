import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Edit from '@/components/Goals/Edit';

seed('Goals/Edit');

const meta = {
  title: 'Goals/Edit',
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
