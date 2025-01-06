import type { Meta, StoryObj } from '@storybook/react';
import faker, { arrayOf, oneOf, seed, title } from '@/.storybook/faker';
import Select from '@/components/Form/Select';
import wrapper from '@/decorators/wrapper';
import Form from '@/components/Form';

seed('Form/Select');

const meta = {
  title: 'Form/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const name = faker.lorem.word();
const labels = arrayOf(() => title());
const values = labels.map(() => faker.string.uuid());

export const WithNoValue = {
  args: {
    name,
    disabled: false,
    label: title(),
    labels,
    values,
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
    defaultValue: oneOf(values),
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
