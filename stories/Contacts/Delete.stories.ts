import type { Meta, StoryObj } from '@storybook/react';
import { seed, title } from '@/.storybook/faker';
import Delete from '@/components/Contacts/Delete';
import { click } from '@/.storybook/play';

seed('Contacts/Delete');

const meta = {
  title: 'Contacts/Delete',
  component: Delete,
} satisfies Meta<typeof Delete>;

export default meta;
type Story = StoryObj<typeof Delete>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    children: title(),
  },
} satisfies Story;

export const Opened = {
  ...WithValue,
  play: click('testId', 'delete-contact-button'),
} satisfies Story;
