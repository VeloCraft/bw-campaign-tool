import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import Route from '@/components/Floods/Route';
import wrapper from '@/decorators/wrapper';
import Maps from '@/components/Maps';
import { Flex } from '@radix-ui/themes';

seed('Floods/Route');

const meta = {
  title: 'Floods/Route',
  component: Route,
} satisfies Meta<typeof Route>;

export default meta;
type Story = StoryObj<typeof Route>;

const stations = generate('station', { count: 5 }) as Station[];
const route = generate('route', { stations }) as Route;

/*
  selected: string | null;
  editable?: boolean;
  filter?: FilterValue;
  */
export const WithValue = {
  args: {
    stations,
    route,
    onSelect: () => {},
    onCreate: () => {},
    onNext: () => {},
    onPrev: () => {},
  },
  decorators: [
    wrapper(Maps),
    wrapper(Flex, { direction: 'column', height: '100dvh' }),
  ],
} satisfies Story;

export const AsEditable = {
  ...WithValue,
  args: {
    ...WithValue.args,
    editable: true,
  },
} satisfies Story;

export const AsSelected = {
  ...WithValue,
  args: {
    ...WithValue.args,
    selected: route.id,
  },
} satisfies Story;
