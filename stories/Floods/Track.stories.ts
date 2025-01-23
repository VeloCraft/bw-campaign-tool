import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Track from '@/components/Floods/Track';
import wrapper from '@/decorators/wrapper';
import GoogleMap from '@/components/Maps';
import { Flex } from '@radix-ui/themes';

seed('Floods/Track');

const latLng = generate('latLng') as google.maps.LatLngLiteral;
const position = {
  latitude: latLng.lat,
  longitude: latLng.lng,
  accuracy: 20,
  altitude: 0,
  altitudeAccuracy: 0,
  heading: 0,
  speed: 0,
  toJSON: () => ({}),
};

const meta = {
  title: 'Floods/Track',
  component: Track,
} satisfies Meta<typeof Track>;

export default meta;
type Story = StoryObj<typeof Track>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    tracking: true,
    setTracking: () => {},
    position,
  },
  decorators: [wrapper(GoogleMap), wrapper(Flex, { height: '100dvh' })],
} satisfies Story;
