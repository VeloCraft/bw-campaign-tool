import type { Meta, StoryObj } from '@storybook/react';
import faker, { description, title, seed } from '@/.storybook/faker';
import TextArea from '@/components/Form/TextArea';
import Form from '@/components/Form';
import wrapper from '@/decorators/wrapper';

seed('Form/TextArea');

const meta = {
  title: 'Form/TextArea',
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

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
    defaultValue: description(),
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
