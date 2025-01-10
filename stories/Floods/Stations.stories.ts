import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Stations from '@/components/Floods/Stations';

seed('Floods/Stations');

const meta = {
  title: 'Floods/Stations',
  component: Stations,
} satisfies Meta<typeof Stations>;

export default meta;
type Story = StoryObj<typeof Stations>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
