import type { Meta, StoryObj } from '@storybook/react';
import faker, { generate, title, seed } from '@/.storybook/faker';
import Media from '@/components/Form/Media';
import wrapper from '@/decorators/wrapper';
import Form from '@/components/Form';

seed('Form/Media');

const meta = {
  title: 'Form/Media',
  component: Media,
} satisfies Meta<typeof Media>;

export default meta;
type Story = StoryObj<typeof Media>;

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
  decorators: [
    wrapper(Form, {
      initialValues: { [name]: generate('media') as Media },
      onSubmit: async () => {},
      noCancel: true,
      noSubmit: true,
    }),
  ],
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
