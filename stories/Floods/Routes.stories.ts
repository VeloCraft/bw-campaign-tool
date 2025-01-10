import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Routes from '@/components/Floods/Routes';

seed('Floods/Routes');

const meta = {
  title: 'Floods/Routes',
  component: Routes,
} satisfies Meta<typeof Routes>;

export default meta;
type Story = StoryObj<typeof Routes>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
