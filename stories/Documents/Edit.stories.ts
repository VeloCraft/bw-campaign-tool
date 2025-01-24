import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, title } from '@/.storybook/faker';
import Edit from '@/components/Documents/Edit';
import { click } from '@/.storybook/play';

seed('Documents/Edit');

const meta = {
  title: 'Documents/Edit',
  component: Edit,
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof Edit>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    children: title(),
    docId: faker.string.uuid(),
  },
} satisfies Story;

export const Opened = {
  ...WithValue,
  play: click('testId', 'edit-document-button'),
} satisfies Story;
