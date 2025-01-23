import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import Routes from '@/components/Floods/Routes';
import withFirestoreResults from '@/decorators/firestoreResults';
import wrapper from '@/decorators/wrapper';
import GoogleMap from '@/components/Maps';
import { Flex } from '@radix-ui/themes';

seed('Floods/Routes');

const stations = generate('station', { count: 10 }) as Station[];
const rootRoutes = generate('rootRoutes', { stations }) as RootRoutes;
const routes = Object.keys(rootRoutes)
  .filter((id) => id !== 'updatedAt')
  .map((id) => ({ id, ...rootRoutes[id] }));

const meta = {
  title: 'Floods/Routes',
  component: Routes,
} satisfies Meta<typeof Routes>;

export default meta;
type Story = StoryObj<typeof Routes>;

export const WithValue = {
  args: {
    stations,
    selected: null,
    onSelect: () => {},
    filter: 'all',
    editable: false,
    rootRoutes,
  },
  decorators: [
    withFirestoreResults({ stations, 'floods/root': rootRoutes, routes }),
    wrapper(GoogleMap),
    wrapper(Flex, { height: '100dvh' }),
  ],
} satisfies Story;

export const AsEditable = {
  ...WithValue,
  args: {
    ...WithValue.args,
    editable: true,
  },
} satisfies Story;
