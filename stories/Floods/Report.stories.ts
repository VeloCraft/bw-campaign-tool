import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Report from '@/components/Floods/Report';

seed('Floods/Report');

const meta = {
  title: 'Floods/Report',
  component: Report,
} satisfies Meta<typeof Report>;

export default meta;
type Story = StoryObj<typeof Report>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
