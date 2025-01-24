import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import List from '@/components/Contacts/List';

seed('Contacts/List');

const meta = {
  title: 'Contacts/List',
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    contacts: generate('contact', { count: 12 }) as Contact[],
  },
} satisfies Story;
