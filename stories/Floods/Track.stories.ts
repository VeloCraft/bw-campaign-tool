import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Track from '@/components/Floods/Track';

seed('Floods/Track');

const meta = {
  title: 'Floods/Track',
  component: Track,
} satisfies Meta<typeof Track>;

export default meta;
type Story = StoryObj<typeof Track>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
