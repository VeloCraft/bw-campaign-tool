import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Editor from '@/components/Floods/Editor';
import wrapper from '@/decorators/wrapper';
import Maps from '@/components/Maps';
import { Flex } from '@radix-ui/themes';

seed('Floods/Editor');

const meta = {
  title: 'Floods/Editor',
  component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof Editor>;

export const WithDefaults = {
  args: {},
  decorators: [
    wrapper(Maps),
    wrapper(Flex, { direction: 'column', height: '100dvh' }),
  ],
} satisfies Story;

export const WithStations = {
  ...WithDefaults,
  args: {
    stations: generate('station', { min: 5, max: 10 }) as Station[],
  },
} satisfies Story;
