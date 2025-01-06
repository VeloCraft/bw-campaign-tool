import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, title, arrayOf } from '@/.storybook/faker';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import Form from '@/components/Form';
import wrapper from '@/decorators/wrapper';

seed('Form/CheckboxGroup');

const meta = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

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
    defaultValue: values.filter(() => faker.datatype.boolean()),
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
