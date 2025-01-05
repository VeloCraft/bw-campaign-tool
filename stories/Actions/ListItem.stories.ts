import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import ListItem from '@/components/Actions/ListItem';
import wrapper from '@/decorators/wrapper';
import { Table } from '@radix-ui/themes';
import { click } from '@/.storybook/play';

seed('Actions/ListItem');

const meta = {
  title: 'Actions/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof ListItem>;

export const WithDefaults = {
  args: {},
  decorators: [wrapper(Table.Body), wrapper(Table.Root)],
} satisfies Story;

export const Loading = {
  ...WithDefaults,
  args: {
    loading: true,
  },
} satisfies Story;

const action = generate('action') as Action;

export const WithAction = {
  ...WithDefaults,
  args: {
    docId: action.id,
    ...action,
  },
} satisfies Story;

export const WithActionEdit = {
  ...WithAction,
  play: click('testId', 'edit-action-button'),
} satisfies Story;

export const WithActionDelete = {
  ...WithAction,
  play: click('testId', 'delete-action-button'),
} satisfies Story;
