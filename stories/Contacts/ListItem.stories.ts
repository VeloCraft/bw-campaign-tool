import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import ListItem from '@/components/Contacts/ListItem';
import wrapper from '@/decorators/wrapper';
import { Table } from '@radix-ui/themes';
import click from '@/.storybook/play';

seed('Contacts/ListItem');

const meta = {
  title: 'Contacts/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof ListItem>;

export const WithDefaults = {
  args: {},
  decorators: [wrapper(Table.Body), wrapper(Table.Root)],
} satisfies Story;

export const WithValue = {
  ...WithDefaults,
  args: generate('contact') as Contact,
} satisfies Story;

export const WithEditableValue = {
  ...WithValue,
  args: {
    ...WithValue.args,
    editable: true,
  },
} satisfies Story;

export const EditClicked = {
  ...WithEditableValue,
  play: click('testId', 'edit-contact-button'),
} satisfies Story;
