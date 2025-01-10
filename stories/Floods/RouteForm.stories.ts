import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import RouteForm from '@/components/Floods/RouteForm';

seed('Floods/RouteForm');

const meta = {
  title: 'Floods/RouteForm',
  component: RouteForm,
} satisfies Meta<typeof RouteForm>;

export default meta;
type Story = StoryObj<typeof RouteForm>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
