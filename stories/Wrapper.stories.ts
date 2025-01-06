import type { Meta, StoryObj } from '@storybook/react';
import { description, seed } from '@/.storybook/faker';
import Wrapper from '@/components/Wrapper';

seed('Wrapper');

const meta = {
  title: 'Wrapper',
  component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof Wrapper>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithChildren = {
  args: {
    children: description(),
  },
} satisfies Story;
