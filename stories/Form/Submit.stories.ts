import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
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

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
