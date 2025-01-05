import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, title } from '@/.storybook/faker';
import Add from '@/components/Documents/Add';
import { click } from '@/.storybook/play';

seed('Documents/Add');

const meta = {
  title: 'Documents/Add',
  component: Add,
} satisfies Meta<typeof Add>;

export default meta;
type Story = StoryObj<typeof Add>;

export const AsDefaultButton = {
  args: {
    campaignId: faker.string.uuid(),
    children: title(),
  },
} satisfies Story;

export const AsLargeButton = {
  args: {
    ...AsDefaultButton.args,
    size: '3',
  },
} satisfies Story;

export const AsSmallButton = {
  args: {
    ...AsDefaultButton.args,
    size: '1',
  },
} satisfies Story;

export const AsOutlinedButton = {
  args: {
    ...AsDefaultButton.args,
    variant: 'outline',
  },
} satisfies Story;

export const Opened = {
  ...AsDefaultButton,
  play: click('testId', 'add-document-button'),
} satisfies Story;
