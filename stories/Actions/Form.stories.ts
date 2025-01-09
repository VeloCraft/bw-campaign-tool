import type { Meta, StoryObj } from '@storybook/react';
import faker, { generate, description, seed, title } from '@/.storybook/faker';
import Form from '@/components/Actions/Form';

seed('Actions/Form');

const meta = {
  title: 'Actions/Form',
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
    title: title(),
    description: description(),
    children: title(),
    campaignId: faker.string.uuid(),
  },
} satisfies Story;

export const Opened = {
  args: {
    ...WithButtonValue.args,
    open: true,
  },
} satisfies Story;

const action = generate('action') as Action;

export const WithInitialValues = {
  args: {
    ...WithButtonValue.args,
    open: true,
    initialValues: action,
  },
} satisfies Story;

export const WithConditionalField = {
  args: {
    ...WithButtonValue.args,
    open: true,
    initialValues: { ...action, assigneeId: 'other'},
  },
} satisfies Story;
