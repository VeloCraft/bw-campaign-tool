import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import InfoWindow from '@/components/Maps/InfoWindow';

seed('Maps/InfoWindow');

const meta = {
  title: 'Maps/InfoWindow',
  component: InfoWindow,
} satisfies Meta<typeof InfoWindow>;

export default meta;
type Story = StoryObj<typeof InfoWindow>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
