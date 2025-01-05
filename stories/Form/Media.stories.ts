import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Media from '@/components/Form/Media';

seed('Form/Media');

const meta = {
  title: 'Form/Media',
  component: Media,
} satisfies Meta<typeof Media>;

export default meta;
type Story = StoryObj<typeof Media>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
