import type { Meta, StoryObj } from '@storybook/react';
import { seed, generate } from '@/.storybook/faker';
import Wrapper from '@/components/Floods/Wrapper';

seed('Floods/Wrapper');

const meta = {
  title: 'Floods/Wrapper',
  component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof Wrapper>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithUser = {
  args: {
    user: generate('user') as User,
  },
} satisfies Story;

export const AsEmbed = {
  args: {
    ...WithUser.args,
    variant: 'embed',
  },
} satisfies Story;

export const AsEdit = {
  args: {
    ...WithUser.args,
    variant: 'edit',
  },
} satisfies Story;
