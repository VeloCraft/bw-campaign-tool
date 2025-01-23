import type { Meta, StoryObj } from '@storybook/react';
import { title, generate, description, seed } from '@/.storybook/faker';
import InfoWindow from '@/components/Maps/InfoWindow';
import wrapper from '@/decorators/wrapper';
import GoogleMap from '@/components/Maps';
import { Heading, Flex, Text } from '@radix-ui/themes';

seed('Maps/InfoWindow');

const meta = {
  title: 'Maps/InfoWindow',
  component: InfoWindow,
} satisfies Meta<typeof InfoWindow>;

export default meta;
type Story = StoryObj<typeof InfoWindow>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    children: <Text>{description()}</Text>,
    position: generate('latLng') as google.maps.LatLngLiteral,
  },
  decorators: [wrapper(GoogleMap), wrapper(Flex, { height: '100dvh' })],
} satisfies Story;

export const WithHeaderContent = {
  ...WithValue,
  args: {
    ...WithValue.args,
    headerContent: <Heading>{title()}</Heading>,
  },
} satisfies Story;
