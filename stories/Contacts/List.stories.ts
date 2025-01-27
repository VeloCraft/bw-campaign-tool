import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, generate } from '@/.storybook/faker';
import List from '@/components/Contacts/List';
import firestoreResults from '@/decorators/firestoreResults';

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

const contacts = generate('contact', { count: 12 }) as Contact[];

export const WithValue = {
  args: {
    contactIds: contacts
      .map(({ id }) => id)
      .filter(() => faker.datatype.boolean()),
  },
  decorators: firestoreResults({ contacts }),
} satisfies Story;

export const AsEditable = {
  ...WithValue,
  args: {
    ...WithValue.args,
    editable: true,
  },
} satisfies Story;
