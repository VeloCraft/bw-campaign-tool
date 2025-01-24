import type { Meta, StoryObj } from '@storybook/react';
import { seed, title } from '@/.storybook/faker';
import Add from '@/components/Contacts/Add';
import { click } from '@/.storybook/play';

seed('Contacts/Add');

const meta = {
  title: 'Contacts/Add',
  component: Add,
} satisfies Meta<typeof Add>;

export default meta;
type Story = StoryObj<typeof Add>;

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
  play: click('testId', 'add-contact-button'),
} satisfies Story;
