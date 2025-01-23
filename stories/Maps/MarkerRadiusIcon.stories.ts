import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
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

export const WithProps = {
  args: {
    style: { color: 'red', width: 40 },
  },
} satisfies Story;
