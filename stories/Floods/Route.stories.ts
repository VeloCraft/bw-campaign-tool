import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Route from '@/components/Floods/Route';

seed('Floods/Route');

const meta = {
  title: 'Floods/Route',
  component: Route,
} satisfies Meta<typeof Route>;

export default meta;
type Story = StoryObj<typeof Route>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
