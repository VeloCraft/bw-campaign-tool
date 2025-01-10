import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import MarkerRadiusIcon from '@/components/Maps/MarkerRadiusIcon';

seed('Maps/MarkerRadiusIcon');

const meta = {
  title: 'Maps/MarkerRadiusIcon',
  component: MarkerRadiusIcon,
} satisfies Meta<typeof MarkerRadiusIcon>;

export default meta;
type Story = StoryObj<typeof MarkerRadiusIcon>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
