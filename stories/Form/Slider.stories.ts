import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, title } from '@/.storybook/faker';
import Slider from '@/components/Form/Slider';
import Form from '@/components/Form';
import wrapper from '@/decorators/wrapper';

seed('Form/Slider');

const meta = {
  title: 'Form/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

const name = faker.lorem.word();

export const WithNoValue = {
  args: {
    name,
    disabled: false,
    label: title(),
    min: 0,
    max: 100,
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
    defaultValue: faker.number.int({ min: 0, max: 100 }),
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
