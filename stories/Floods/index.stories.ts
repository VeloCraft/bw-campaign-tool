import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import index from '@/components/Floods/index';

seed('Floods/index');

const meta = {
  title: 'Floods/index',
  component: index,
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof index>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
