import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Embed from '@/components/Floods/Embed';
import firestoreResults from '@/decorators/firestoreResults';

seed('Floods/Embed');

const stations = generate('station', { count: 5 }) as Station[];
const rootRoutes = generate('rootRoutes', { stations }) as RootRoutes;

const meta = {
  title: 'Floods/Embed',
  component: Embed,
} satisfies Meta<typeof Embed>;

export default meta;
type Story = StoryObj<typeof Embed>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    stations,
    rootRoutes,
  },
  decorators: [firestoreResults({ stations, 'floods/root': rootRoutes })],
} satisfies Story;
