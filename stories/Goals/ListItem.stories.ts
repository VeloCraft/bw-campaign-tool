import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, oneOf, generate } from '@/.storybook/faker';
import ListItem from '@/components/Goals/ListItem';
import wrapper from '@/decorators/wrapper';
import { Table } from '@radix-ui/themes';
import { click } from '@/.storybook/play';

seed('Goals/ListItem');

const meta = {
  title: 'Goals/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof ListItem>;

export const WithDefaults = {
  args: {},
  decorators: [wrapper(Table.Body), wrapper(Table.Root)],
} satisfies Story;

export const WithLoading = {
  ...WithDefaults,
  args: {
    loading: true,
  },
} satisfies Story;

const goals = generate('goal', { count: 12 }) as Goal[];
const goal = oneOf(goals);

export const WithGoal = {
  ...WithDefaults,
  args: {
    docId: faker.string.uuid(),
    goals,
    goal,
  },
} satisfies Story;

export const WithEditOpen = {
  ...WithGoal,
  play: click('testId', 'edit-goal-button'),
} satisfies Story;

export const WithDeleteOpen = {
  ...WithGoal,
  play: click('testId', 'delete-goal-button'),
} satisfies Story;
