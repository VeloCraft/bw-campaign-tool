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

export const WithDefaults = {
  args: {},
  decorators: [wrapper(Table.Body), wrapper(Table.Root)],
} satisfies Story;

const media = generate('media') as Media;

export const WithAction = {
  ...WithDefaults,
  args: {
    docId: media.public_id,
    ...media,
  },
} satisfies Story;

export const WithActionDelete = {
  ...WithAction,
  play: click('testId', 'delete-document-button'),
} satisfies Story;
