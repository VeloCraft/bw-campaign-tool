import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import SaveWindow from '@/components/Floods/SaveWindow';

seed('Floods/SaveWindow');

const meta = {
  title: 'Floods/SaveWindow',
  component: SaveWindow,
} satisfies Meta<typeof SaveWindow>;

export default meta;
type Story = StoryObj<typeof SaveWindow>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
