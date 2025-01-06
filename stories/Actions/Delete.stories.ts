import type { Meta, StoryObj } from '@storybook/react';
import { seed, title } from '@/.storybook/faker';
import Delete from '@/components/Actions/Delete';
import { click } from '@/.storybook/play';

seed('Actions/Delete');

const meta = {
  title: 'Actions/Delete',
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

export const Opened = {
  ...WithChildren,
  play: click('testId', 'delete-action-button'),
} satisfies Story;
