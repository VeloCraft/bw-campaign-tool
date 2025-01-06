import type { Meta, StoryObj } from '@storybook/react';
import faker, { title, seed } from '@/.storybook/faker';
import Edit from '@/components/Users/Edit';
import { click } from '@/.storybook/play';

seed('Users/Edit');

const meta = {
  title: 'Users/Edit',
  component: Edit,
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof Edit>;

const allRoles = ['admin', 'editor', 'contributor', 'subscriber'];

export const WithValue = {
  args: {
    email: faker.internet.email(),
    allRoles,
    roles: allRoles.filter(() => faker.datatype.boolean()),
    onDelete: async () => {},
    onUpdate: async () => {},
  },
} satisfies Story;

export const WithChildren = {
  args: {
    ...WithValue.args,
    children: title(),
  },
} satisfies Story;

export const AsLargeButton = {
  args: {
    ...WithChildren.args,
    size: '3',
  },
} satisfies Story;

export const AsSmallButton = {
  args: {
    ...WithChildren.args,
    size: '1',
  },
} satisfies Story;

export const AsOutlinedButton = {
  args: {
    ...WithChildren.args,
    variant: 'outline',
  },
} satisfies Story;

export const Opened = {
  ...WithChildren,
  play: click('testId', 'edit-user-roles-button'),
} satisfies Story;
