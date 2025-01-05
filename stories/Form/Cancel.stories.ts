import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Cancel from '@/components/Form/Cancel';

seed('Form/Cancel');

const meta = {
  title: 'Form/Cancel',
  component: Cancel,
} satisfies Meta<typeof Cancel>;

export default meta;
type Story = StoryObj<typeof Cancel>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
