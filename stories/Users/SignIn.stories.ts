import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import SignIn from '@/components/Users/SignIn';

seed('Users/SignIn');

const meta = {
  title: 'Users/SignIn',
  component: SignIn,
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof SignIn>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    onComplete: () => {},
  },
} satisfies Story;

export const WithAutofilledEmail = {
  args: {
    ...WithValue.args,
    email: faker.internet.email(),
  },
} satisfies Story;

export const WithAdditionalStyle = {
  args: {
    ...WithValue.args,
    style: {
      backgroundColor: 'red',
    },
  },
} satisfies Story;
