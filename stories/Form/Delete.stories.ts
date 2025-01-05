import type { Meta, StoryObj } from '@storybook/react';
import { title, description, seed } from '@/.storybook/faker';
import Delete from '@/components/Form/Delete';
import { click } from '@/.storybook/play';

seed('Form/Delete');

const meta = {
  title: 'Form/Delete',
  component: Delete,
} satisfies Meta<typeof Delete>;

export default meta;
type Story = StoryObj<typeof Delete>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValues = {
  args: {
    label: title(),
    message: description(),
    title: title(),
    okLabel: title(),
    onDelete: async () => {},
  },
} satisfies Story;

export const WithChildren = {
  args: {
    ...WithValues.args,
    label: null,
    children: title(),
  },
} satisfies Story;

export const AsLargeButton = {
  args: {
    ...WithValues.args,
    size: '3',
  },
} satisfies Story;

export const AsSmallButton = {
  args: {
    ...WithValues.args,
    size: '1',
  },
} satisfies Story;

export const AsSoftButton = {
  args: {
    ...WithValues.args,
    variant: 'soft',
  },
} satisfies Story;

export const AsBlueButton = {
  args: {
    ...WithValues.args,
    color: 'blue',
  },
} satisfies Story;

export const Opened = {
  ...WithValues,
  play: click('testId', 'form-delete-button'),
} satisfies Story;
