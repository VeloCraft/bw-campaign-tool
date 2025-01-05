import type { Meta, StoryObj } from '@storybook/react';
import faker, { title, seed } from '@/.storybook/faker';
import Default from '@/components/Form/Default';
import Form from '@/components/Form';
import wrapper from '@/decorators/wrapper';

seed('Form/Default');

const meta = {
  title: 'Form/Default',
  component: Default,
} satisfies Meta<typeof Default>;

export default meta;
type Story = StoryObj<typeof Default>;

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
    defaultValue: faker.lorem.sentence(),
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
