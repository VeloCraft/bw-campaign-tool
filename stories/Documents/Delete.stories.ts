import type { Meta, StoryObj } from '@storybook/react';
import { title, seed } from '@/.storybook/faker';
import Delete from '@/components/Documents/Delete';

seed('Documents/Delete');

const meta = {
  title: 'Documents/Delete',
  component: Delete,
} satisfies Meta<typeof Delete>;

export default meta;
type Story = StoryObj<typeof Delete>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithChildren = {
  args: {
    children: title(),
  },
} satisfies Story;

export const AsLargeButton = {
  args: {
    ...WithChildren.args,
    size: '3',
  },
} satisfies Story;

export const AsSmallButton = {
  args: {
    ...WithChildren.args,
    size: '1',
  },
} satisfies Story;

export const AsOutlinedButton = {
  args: {
    ...WithChildren.args,
    variant: 'outline',
  },
} satisfies Story;

export const AsRedButton = {
  args: {
    ...WithChildren.args,
    color: 'red',
  },
} satisfies Story;
