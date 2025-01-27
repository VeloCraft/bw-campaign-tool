import type { Meta, StoryObj } from '@storybook/react';
import SelectMultiple from '@/components/Form/SelectMultiple';
import faker, { arrayOf, seed, title } from '@/.storybook/faker';
import wrapper from '@/decorators/wrapper';
import Form from '@/components/Form';
import { click } from '@/.storybook/play';

seed('Form/SelectMultiple');

const meta = {
  title: 'Form/SelectMultiple',
  component: SelectMultiple,
} satisfies Meta<typeof SelectMultiple>;

export default meta;
type Story = StoryObj<typeof SelectMultiple>;

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
    placeholder: title(),
  },
  decorators: [
    wrapper(Form, {
      onSubmit: async () => {},
      noCancel: true,
      noSubmit: true,
    }),
  ],
} satisfies Story;

export const WithNoValueOpened = {
  ...WithNoValue,
  play: click('testId', 'select-multiple'),
} satisfies Story;

export const WithValue = {
  ...WithNoValue,
  args: {
    ...WithNoValue.args,
    defaultValue: values.slice(0, 2),
  },
} satisfies Story;

export const WithValueOpened = {
  ...WithValue,
  play: click('testId', 'select-multiple'),
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

export const WithEmpty = {
  ...WithNoValue,
  args: {
    ...WithValue.args,
    defaultValue: [],
    empty: title(),
  },
} satisfies Story;

export const WithEmptyOpen = {
  ...WithEmpty,
  play: click('testId', 'select-multiple'),
} satisfies Story;
