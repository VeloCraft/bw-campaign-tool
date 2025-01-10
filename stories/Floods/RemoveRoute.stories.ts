import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import RemoveRoute from '@/components/Floods/RemoveRoute';

seed('Floods/RemoveRoute');

const meta = {
  title: 'Floods/RemoveRoute',
  component: RemoveRoute,
} satisfies Meta<typeof RemoveRoute>;

export default meta;
type Story = StoryObj<typeof RemoveRoute>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
