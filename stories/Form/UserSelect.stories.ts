import type { Meta, StoryObj } from '@storybook/react';
import { seed, title } from '@/.storybook/faker';
import UserSelect from '@/components/Form/UserSelect';
import Form from '@/components/Form';
import { Box } from '@radix-ui/themes';
import wrapper from '@/decorators/wrapper';

seed('Form/UserSelect');

const meta = {
  title: 'Form/UserSelect',
  component: UserSelect,
} satisfies Meta<typeof UserSelect>;

export default meta;
type Story = StoryObj<typeof UserSelect>;

export const WithDefaults = {
  args: {},
  decorators: [
    wrapper(Form, { noSubmit: true, noCancel: true, onSubmit: async () => {} }),
    wrapper(Box, { width: '300px' }),
  ],
} satisfies Story;

export const WithValue = {
  ...WithDefaults,
  args: {
    name: title(),
    label: title(),
    required: false,
    disabled: false,
    placeholder: title(),
  },
} satisfies Story;

export const WithRequired = {
  ...WithValue,
  args: {
    ...WithValue.args,
    required: true,
  },
} satisfies Story;

export const WithDisabled = {
  ...WithValue,
  args: {
    ...WithValue.args,
    disabled: true,
  },
} satisfies Story;
