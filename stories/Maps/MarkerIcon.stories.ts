import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import MarkerIcon from '@/components/Maps/MarkerIcon';

seed('Maps/MarkerIcon');

const meta = {
  title: 'Maps/MarkerIcon',
  component: MarkerIcon,
} satisfies Meta<typeof MarkerIcon>;

export default meta;
type Story = StoryObj<typeof MarkerIcon>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithProps = {
  args: {
    style: { color: 'red', width: 40 },
  },
} satisfies Story;
