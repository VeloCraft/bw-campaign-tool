import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Field from '@/components/Form/Field';
import wrapper from '@/decorators/wrapper';
import Form from '@/components/Form';

seed('Form/Field');

const meta = {
  title: 'Form/Field',
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof Field>;

const name = faker.lorem.word();

export const WithField = {
  args: { name },
  decorators: [wrapper(Form, { onSubmit: async () => {} })],
} satisfies Story;

export const WithValue = {
  ...WithField,
  decorators: [
    wrapper(Form, {
      initialValues: { [name]: faker.lorem.words() },
      onSubmit: async () => {},
    }),
  ],
} satisfies Story;
