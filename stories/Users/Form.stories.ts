import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed, title, description } from '@/.storybook/faker';
import Form from '@/components/Users/Form';

seed('Users/Form');

const meta = {
  title: 'Users/Form',
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithButtonValue = {
  args: {
    open: false,
    setOpen: () => {},
    onSubmit: async () => {},
    onDelete: async () => {},
    title: title(),
    description: description(),
    roles: ['admin', 'contributor', 'viewer'],
    children: title(),
  },
} satisfies Story;

export const Opened = {
  args: {
    ...WithButtonValue.args,
    open: true,
  },
} satisfies Story;

const userLine = {
  email: faker.internet.email(),
  roles: ['admin', 'contributor', 'viewer'].filter(() =>
    faker.datatype.boolean(),
  ),
};

export const WithInitialValues = {
  args: {
    ...WithButtonValue.args,
    open: true,
    initialValues: userLine,
  },
} satisfies Story;
