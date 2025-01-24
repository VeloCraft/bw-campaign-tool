import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import ListItem from '@/components/Documents/ListItem';
import { click } from '@/.storybook/play';
import wrapper from '@/decorators/wrapper';
import { Table } from '@radix-ui/themes';

seed('Documents/ListItem');

const meta = {
  title: 'Documents/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof ListItem>;

const document = generate('document') as DocumentDoc;

export const WithAction = {
  args: {
    docId: document.id,
    document,
  },
  decorators: [wrapper(Table.Body), wrapper(Table.Root)],
} satisfies Story;

export const WithActionDelete = {
  ...WithAction,
  play: click('testId', 'delete-document-button'),
} satisfies Story;
