import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import TrackSwitch from '@/components/Maps/TrackSwitch';

seed('Maps/TrackSwitch');

const meta = {
  title: 'Maps/TrackSwitch',
  component: TrackSwitch,
} satisfies Meta<typeof TrackSwitch>;

export default meta;
type Story = StoryObj<typeof TrackSwitch>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
