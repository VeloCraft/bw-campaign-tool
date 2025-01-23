import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Report from '@/components/Floods/Report';

seed('Floods/Report');

const meta = {
  title: 'Floods/Report',
  component: Report,
} satisfies Meta<typeof Report>;

export default meta;
type Story = StoryObj<typeof Report>;

const stations = generate('station', { count: 2 }) as Station[];
const route = generate('route', { stations }) as Route;

export const AsClear = {
  args: {
    route: {
      ...route,
      hazardous: false,
    },
    stations,
    onClose: () => {},
  },
} satisfies Story;

export const AsFlooded = {
  args: {
    ...AsClear.args,
    route: {
      ...route,
      hazardous: false,
      level: 5,
    },
  },
} satisfies Story;

export const AsHazardous = {
  args: {
    ...AsClear.args,
    route: {
      ...route,
      level: 5,
      hazardous: true,
    },
  },
} satisfies Story;
