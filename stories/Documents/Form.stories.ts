import type { Meta, StoryObj } from '@storybook/react';
import { description, generate, seed, title } from '@/.storybook/faker';
import Form from '@/components/Documents/Form';

seed('Documents/Form');

const meta = {
  title: 'Documents/Form',
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    open: false,
    setOpen: () => {},
    onSubmit: async () => {},
    title: title(),
    description: description(),
    children: title(),
  },
} satisfies Story;

export const Opened = {
  args: {
    ...WithValue.args,
    open: true,
  },
} satisfies Story;

const document = generate('document') as DocumentDoc;

export const WithInitialValues = {
  args: {
    ...WithValue.args,
    open: true,
    initialValues: document,
  },
} satisfies Story;
