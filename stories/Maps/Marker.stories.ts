import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Marker from '@/components/Maps/Marker';

seed('Maps/Marker');

const meta = {
  title: 'Maps/Marker',
  component: Marker,
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof Marker>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
