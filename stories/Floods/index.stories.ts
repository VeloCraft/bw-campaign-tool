import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import index from '@/components/Floods/index';

seed('Floods/index');

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

const stations = generate('station', { count: 10 }) as Station[];

const meta = {
  title: 'Floods/index',
  component: index,
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof index>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const Editable = {
  args: {
    editable: true,
  },
} satisfies Story;

export const WithTracking = {
  args: {
    tracking: true,
    position,
  },
} satisfies Story;

export const WithStations = {
  args: {
    stations,
  },
} satisfies Story;
