import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Edit from '@/components/Campaigns/Edit';
import { click } from '@/.storybook/play';

seed('Campaigns/Edit');

const meta = {
  title: 'Campaigns/Edit',
  component: Edit,
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof Edit>;

export const WithValue = {
  args: {
    docId: faker.string.uuid(),
  },
} satisfies Story;

export const WithChildren = {
  args: {
    ...WithValue.args,
    children: 'Edit',
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
  play: click('testId', 'edit-campaign-button'),
} satisfies Story;
