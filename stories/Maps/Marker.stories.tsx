import type { Meta, StoryObj } from '@storybook/react';
import { title, generate, description, seed } from '@/.storybook/faker';
import wrapper from '@/decorators/wrapper';
import GoogleMap from '@/components/Maps';
import { Flex } from '@radix-ui/themes';
import Marker from '@/components/Maps/Marker';

seed('Maps/Marker');

const meta = {
  title: 'Maps/Marker',
  component: Marker,
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof Marker>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: title(),
    header: title(),
    info: description(),
    position: generate('latLng') as google.maps.LatLngLiteral,
  },
  decorators: [wrapper(GoogleMap), wrapper(Flex, { height: '100dvh' })],
} satisfies Story;

export const Opened = {
  ...WithValue,
  args: {
    ...WithValue.args,
    open: true,
  },
} satisfies Story;
