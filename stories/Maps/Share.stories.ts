import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import Share from '@/components/Maps/Share';

seed('Maps/Share');

const meta = {
  title: 'Maps/Share',
  component: Share,
} satisfies Meta<typeof Share>;

export default meta;
type Story = StoryObj<typeof Share>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    defaultValue: true,
    onChange: () => {},
  },
} satisfies Story;

export const WithError = {
  args: {
    ...WithValue.args,
    error: true,
  },
} satisfies Story;
