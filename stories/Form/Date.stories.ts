import type { Meta, StoryObj } from '@storybook/react';
import faker, { generate, title, seed } from '@/.storybook/faker';
import Date from '@/components/Form/Date';
import Form from '@/components/Form';
import wrapper from '@/decorators/wrapper';

seed('Form/Date');

const meta = {
  title: 'Form/Date',
  component: Date,
} satisfies Meta<typeof Date>;

export default meta;
type Story = StoryObj<typeof Date>;

const name = faker.lorem.word();

export const WithNoValue = {
  args: {
    name,
    disabled: false,
    label: title(),
  },
  decorators: [
    wrapper(Form, {
      onSubmit: async () => {},
      noCancel: true,
      noSubmit: true,
    }),
  ],
} satisfies Story;

export const WithValue = {
  ...WithNoValue,
  args: {
    ...WithNoValue.args,
    defaultValue: generate('date') as Date,
  },
} satisfies Story;

export const WithDisabled = {
  ...WithNoValue,
  args: {
    ...WithValue.args,
    disabled: true,
  },
} satisfies Story;

export const Required = {
  ...WithNoValue,
  args: {
    ...WithValue.args,
    required: true,
  },
} satisfies Story;
