import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import RemoveRoute from '@/components/Floods/RemoveRoute';
import { TrashIcon } from '@radix-ui/react-icons';

seed('Floods/RemoveRoute');

const meta = {
  title: 'Floods/RemoveRoute',
  component: RemoveRoute,
} satisfies Meta<typeof RemoveRoute>;

export default meta;
type Story = StoryObj<typeof RemoveRoute>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithIcon = {
  args: {
    children: <TrashIcon />,
  },
} satisfies Story;

export const AsRedOutline = {
  args: {
    ...WithIcon.args,
    color: 'red',
    variant: 'outline',
  },
} satisfies Story;
