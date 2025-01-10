import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Estimate from '@/components/Floods/Estimate';

seed('Floods/Estimate');

const meta = {
  title: 'Floods/Estimate',
  component: Estimate,
} satisfies Meta<typeof Estimate>;

export default meta;
type Story = StoryObj<typeof Estimate>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
