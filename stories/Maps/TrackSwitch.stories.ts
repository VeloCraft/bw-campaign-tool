import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import TrackSwitch from '@/components/Maps/TrackSwitch';
import { Box } from '@radix-ui/themes';
import wrapper from '@/decorators/wrapper';
import click from '@/.storybook/play';

seed('Maps/TrackSwitch');

const meta = {
  title: 'Maps/TrackSwitch',
  component: TrackSwitch,
} satisfies Meta<typeof TrackSwitch>;

export default meta;
type Story = StoryObj<typeof TrackSwitch>;

export const WithDefaults = {
  args: {},
  decorators: [wrapper(Box, { width: '240px', height: '240px' })],
} satisfies Story;

export const WithTracking = {
  ...WithDefaults,
  args: {
    setTracking: () => {},
    setPosition: () => {},
    tracking: true,
  },
} satisfies Story;

export const WithTrackingAndClicked = {
  ...WithTracking,
  play: click('testId', 'tracking-button'),
} satisfies Story;

export const WithPosition = {
  ...WithDefaults,
  args: {
    setTracking: () => {},
    setPosition: () => {},
    tracking: true,
    hasPosition: true,
  },
} satisfies Story;

export const WithPositionAndClicked = {
  ...WithPosition,
  play: click('testId', 'tracking-button'),
} satisfies Story;
