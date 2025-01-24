import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Page from '@/components/Contacts/Page';

seed('Contacts/Page');

const meta = {
  title: 'Contacts/Page',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof Page>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    user: generate('user') as User,
    contacts: generate('contact', { count: 12 }) as Contact[],
  },
} satisfies Story;
