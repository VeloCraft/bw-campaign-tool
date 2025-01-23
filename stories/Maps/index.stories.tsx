import type { Meta, StoryObj } from '@storybook/react';
import { description, seed } from '@/.storybook/faker';
import index from '@/components/Maps/index';
import wrapper from '@/decorators/wrapper';
import { Flex } from '@radix-ui/themes';

seed('Maps/index');

const meta = {
  title: 'Maps/index',
  component: index,
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof index>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  ...WithDefaults,
  decorators: [wrapper(Flex, { height: '100dvh', direction: 'column' })],
} satisfies Story;

export const WithHeader = {
  ...WithValue,
  args: {
    ...WithValue.args,
    header: description(),
  },
} satisfies Story;

export const WithFooter = {
  ...WithValue,
  args: {
    ...WithValue.args,
    footer: description(),
  },
} satisfies Story;

export const WithHeaderFooter = {
  ...WithHeader,
  args: {
    ...WithHeader.args,
    footer: description(),
  },
} satisfies Story;
