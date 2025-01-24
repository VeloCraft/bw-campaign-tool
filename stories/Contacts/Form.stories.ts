import type { Meta, StoryObj } from '@storybook/react';
import { generate, description, seed, title } from '@/.storybook/faker';
import Form from '@/components/Contacts/Form';

seed('Contacts/Form');

const meta = {
  title: 'Contacts/Form',
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: title(),
    description: description(),
    children: title(),
    setOpen: () => {},
    onSubmit: async () => {},
  },
} satisfies Story;

export const Opened = {
  args: {
    ...WithValue.args,
    open: true,
  },
} satisfies Story;

export const WithInitialValues = {
  args: {
    ...Opened.args,
    initialValues: generate('contact') as Contact,
  },
} satisfies Story;
