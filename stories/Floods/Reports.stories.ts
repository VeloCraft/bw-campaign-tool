import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import Reports from '@/components/Floods/Reports';

seed('Floods/Reports');

const meta = {
  title: 'Floods/Reports',
  component: Reports,
} satisfies Meta<typeof Reports>;

export default meta;
type Story = StoryObj<typeof Reports>;

const route = generate('route') as Route;

export const WithReports = {
  args: {
    route,
    onClose: () => {},
  },
} satisfies Story;

export const WithoutReports = {
  args: {
    route: {
      ...route,
      reports: [],
    },
    onClose: () => {},
  },
} satisfies Story;
