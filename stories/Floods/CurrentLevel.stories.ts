import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import CurrentLevel from '@/components/Floods/CurrentLevel';

seed('Floods/CurrentLevel');

const meta = {
  title: 'Floods/CurrentLevel',
  component: CurrentLevel,
} satisfies Meta<typeof CurrentLevel>;

export default meta;
type Story = StoryObj<typeof CurrentLevel>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
