import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Embed from '@/components/Floods/Embed';

seed('Floods/Embed');

const meta = {
  title: 'Floods/Embed',
  component: Embed,
} satisfies Meta<typeof Embed>;

export default meta;
type Story = StoryObj<typeof Embed>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
