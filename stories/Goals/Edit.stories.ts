import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, generate, oneOf } from '@/.storybook/faker';
import Edit from '@/components/Goals/Edit';
import { click } from '@/.storybook/play';

seed('Goals/Edit');

const meta = {
  title: 'Goals/Edit',
  component: Edit,
} satisfies Meta<typeof Edit>;

export default meta;
type Story = StoryObj<typeof Edit>;

const goals = generate('goal', { count: 12 }) as Goal[];
const goal = oneOf(goals);

export const WithValue = {
  args: {
    docId: faker.string.uuid(),
    goalId: goal.id,
    goals,
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
  play: click('testId', 'edit-goal-button'),
} satisfies Story;
