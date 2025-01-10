import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import StationGraph from '@/components/Floods/StationGraph';

seed('Floods/StationGraph');

const meta = {
  title: 'Floods/StationGraph',
  component: StationGraph,
} satisfies Meta<typeof StationGraph>;

export default meta;
type Story = StoryObj<typeof StationGraph>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
