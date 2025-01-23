import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import SaveWindow from '@/components/Floods/SaveWindow';
import wrapper from '@/decorators/wrapper';
import GoogleMap from '@/components/Maps';
import { Flex } from '@radix-ui/themes';

seed('Floods/SaveWindow');

const stations = generate('station', { count: 10 }) as Station[];

const meta = {
  title: 'Floods/SaveWindow',
  component: SaveWindow,
} satisfies Meta<typeof SaveWindow>;

export default meta;
type Story = StoryObj<typeof SaveWindow>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    onClose: () => {},
    stations,
  },
  decorators: [wrapper(GoogleMap), wrapper(Flex, { height: '100dvh' })],
} satisfies Story;
