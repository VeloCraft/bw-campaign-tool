import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, title } from '@/.storybook/faker';
import Edit from '@/components/Contacts/Edit';
import { click } from '@/.storybook/play';

seed('Contacts/Edit');

const meta = {
  title: 'Contacts/Edit',
  component: Edit,
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof Edit>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    docId: faker.string.uuid(),
    children: title(),
  },
} satisfies Story;

export const Opened = {
  ...WithValue,
  play: click('testId', 'edit-contact-button'),
} satisfies Story;
