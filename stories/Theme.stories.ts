import type { Meta, StoryObj } from '@storybook/react';
import { description, seed } from '@/.storybook/faker';
import Theme from '@/components/Theme';
import { Heading } from '@radix-ui/themes';

seed('Theme');

const meta = {
  title: 'Theme',
  component: Theme,
} satisfies Meta<typeof Theme>;

export default meta;
type Story = StoryObj<typeof Theme>;

export const WithDivWrapper = {
  args: { wrapper: 'div', children: description() },
} satisfies Story;

export const WithHeadingWrapper = {
  args: {
    wrapper: Heading,
    children: description(),
  },
} satisfies Story;
