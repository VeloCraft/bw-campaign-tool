import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed, title } from '@/.storybook/faker';
import Add from '@/components/Actions/Add';
import { click } from '@/.storybook/play';

seed('Actions/Add');

const meta = {
  title: 'Actions/Add',
  component: Add,
} satisfies Meta<typeof Add>;

export default meta;
type Story = StoryObj<typeof Add>;

export const AsDefaultButton = {
  args: {
    campaign: generate('campaign') as Campaign,
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
  play: click('testId', 'add-action-button'),
} satisfies Story;
