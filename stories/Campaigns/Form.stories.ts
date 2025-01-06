import type { Meta, StoryObj } from '@storybook/react';
import { generate, title, seed, description } from '@/.storybook/faker';
import Form from '@/components/Campaigns/Form';

seed('Campaigns/Form');

const meta = {
  title: 'Campaigns/Form',
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
  },
} satisfies Story;

export const Opened = {
  args: {
    ...WithButtonValue.args,
    open: true,
  },
} satisfies Story;

const campaign = generate('campaign') as Campaign;

export const WithInitialValues = {
  args: {
    ...WithButtonValue.args,
    open: true,
    initialValues: campaign,
  },
} satisfies Story;
