import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, generate } from '@/.storybook/faker';
import Manage from '@/components/Contacts/Manage';
import { click } from '@/.storybook/play';
import firestoreResults from '@/decorators/firestoreResults';

seed('Contacts/Manage');

const meta = {
  title: 'Contacts/Manage',
  component: Manage,
} satisfies Meta<typeof Manage>;

export default meta;
type Story = StoryObj<typeof Manage>;

const contacts = generate('contact', { count: 12 }) as Contact[];

export const WithValue = {
  args: {
    campaignId: faker.string.uuid(),
    contactIds: contacts
      .filter(() => faker.datatype.boolean())
      .map(({ id }) => id),
  },
  decorators: firestoreResults({ contacts }),
} satisfies Story;

export const Opened = {
  ...WithValue,
  play: click('testId', 'manage-contacts-button'),
} satisfies Story;
