import type { Meta, StoryObj } from '@storybook/react';
import { seed, title } from '@/.storybook/faker';
import CurrentLevel from '@/components/Floods/CurrentLevel';

seed('Floods/CurrentLevel');

const meta = {
  title: 'Floods/CurrentLevel',
  component: CurrentLevel,
} satisfies Meta<typeof CurrentLevel>;

export default meta;
type Story = StoryObj<typeof CurrentLevel>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    children: title(),
    size: '2',
    variant: 'solid',
  },
} satisfies Story;

export const WithDisabled = {
  args: {
    children: title(),
    size: '2',
    variant: 'solid',
    disabled: true,
  },
} satisfies Story;

export const WithLoading = {
  args: {
    children: title(),
    size: '2',
    variant: 'solid',
    loading: true,
  },
} satisfies Story;
