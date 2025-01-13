import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import UserSelect from '@/components/Form/UserSelect';

seed('Form/UserSelect');

const meta = {
  title: 'Form/UserSelect',
  component: UserSelect,
} satisfies Meta<typeof UserSelect>;

export default meta;
type Story = StoryObj<typeof UserSelect>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
