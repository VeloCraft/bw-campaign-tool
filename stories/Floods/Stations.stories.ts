import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Stations from '@/components/Floods/Stations';
import wrapper from '@/decorators/wrapper';
import GoogleMap from '@/components/Maps';
import { Flex } from '@radix-ui/themes';

seed('Floods/Stations');

const stations = generate('station', { count: 10 }) as Station[];

const meta = {
  title: 'Floods/Stations',
  component: Stations,
} satisfies Meta<typeof Stations>;

export default meta;
type Story = StoryObj<typeof Stations>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    stations,
  },
  decorators: [wrapper(GoogleMap), wrapper(Flex, { height: '100dvh' })],
} satisfies Story;
