import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import Estimate from '@/components/Floods/Estimate';

seed('Floods/Estimate');

const meta = {
  title: 'Floods/Estimate',
  component: Estimate,
} satisfies Meta<typeof Estimate>;

export default meta;
type Story = StoryObj<typeof Estimate>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const AsClear = {
  args: {
    onUpdate: async () => {},
    onCancel: () => {},
    status: 'clear',
  },
} satisfies Story;

export const AsFlooded = {
  args: {
    ...AsClear.args,
    status: 'flooded',
  },
} satisfies Story;

export const AsRed = {
  args: {
    ...AsClear.args,
    color: 'red',
  },
} satisfies Story;
