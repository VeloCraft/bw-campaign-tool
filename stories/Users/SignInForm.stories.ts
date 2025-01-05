import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import SignInForm from '@/components/Users/SignInForm';

seed('Users/SignInForm');

const meta = {
  title: 'Users/SignInForm',
  component: SignInForm,
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof SignInForm>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
