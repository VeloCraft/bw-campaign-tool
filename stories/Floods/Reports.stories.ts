import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Reports from '@/components/Floods/Reports';

seed('Floods/Reports');

const meta = {
  title: 'Floods/Reports',
  component: Reports,
} satisfies Meta<typeof Reports>;

export default meta;
type Story = StoryObj<typeof Reports>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
