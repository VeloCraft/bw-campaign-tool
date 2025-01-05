import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import Cancel from '@/components/Form/Cancel';

seed('Form/Cancel');

const meta = {
  title: 'Form/Cancel',
  component: Cancel,
} satisfies Meta<typeof Cancel>;

export default meta;
type Story = StoryObj<typeof Cancel>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const AsLargeButton = {
  args: {
    size: '3',
  },
} satisfies Story;

export const AsSmallButton = {
  args: {
    size: '1',
  },
} satisfies Story;

export const AsOutlinedButton = {
  args: {
    variant: 'outline',
  },
} satisfies Story;

export const AsRedButton = {
  args: {
    color: 'red',
  },
} satisfies Story;
