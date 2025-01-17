import { click } from '@/.storybook/play';
import type { Meta, StoryObj } from '@storybook/react';
import { seed, title, generate } from '@/.storybook/faker';
import RouteForm from '@/components/Floods/RouteForm';

seed('Floods/RouteForm');

const meta = {
  title: 'Floods/RouteForm',
  component: RouteForm,
} satisfies Meta<typeof RouteForm>;

export default meta;
type Story = StoryObj<typeof RouteForm>;

export const WithDefaults = {
  args: {},
} satisfies Story;

const stations = generate('station', { count: 5 }) as Station[];
const route = generate('route', { stations }) as Route;

export const WithValue = {
  args: {
    title: title(),
    onUpdate: async () => {},
    initialValues: route,
    stations,
    children: title(),
  },
} satisfies Story;

export const AsLarge = {
  ...WithValue,
  args: {
    ...WithValue.args,
    size: '3',
  },
} satisfies Story;

export const AsOutlined = {
  ...WithValue,
  args: {
    ...WithValue.args,
    variant: 'outline',
  },
} satisfies Story;

export const AsRed = {
  ...WithValue,
  args: {
    ...WithValue.args,
    color: 'red',
  },
} satisfies Story;

export const Opened = {
  ...WithValue,
  play: click('testId', 'route-form-edit-button'),
} satisfies Story;
