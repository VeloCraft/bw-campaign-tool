import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import Submit from '@/components/Form/Submit';

seed('Form/Submit');

const meta = {
  title: 'Form/Submit',
  component: Submit,
} satisfies Meta<typeof Submit>;

export default meta;
type Story = StoryObj<typeof Submit>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const AsLargeButton = {
  args: {
    size: '3',
  },
} satisfies Story;

export const AsSmallButton = {
  args: {
    size: '1',
  },
} satisfies Story;

export const AsOutlinedButton = {
  args: {
    variant: 'outline',
  },
} satisfies Story;

export const AsRedButton = {
  args: {
    color: 'red',
  },
} satisfies Story;
