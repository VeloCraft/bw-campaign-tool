import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import Logo from '@/components/Logo';

seed('Logo');

const meta = {
  title: 'Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof Logo>;

export const WithDefaults = {
  args: {},
} satisfies Story;
