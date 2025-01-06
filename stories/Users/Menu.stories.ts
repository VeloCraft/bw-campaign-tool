import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import Menu from '@/components/Users/Menu';
import wrapper from '@/decorators/wrapper';
import { Provider as UserProvider } from '@/contexts/User';
import { Box } from '@radix-ui/themes';
import { click } from '@/.storybook/play';

seed('Users/Menu');

const meta = {
  title: 'Users/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof Menu>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithUser = {
  decorators: [
    wrapper(UserProvider, { value: generate('user') as User }),
    wrapper(Box, { m: '2' }),
  ],
} satisfies Story;

export const Opened = {
  ...WithUser,
  play: click('testId', 'user-menu-button'),
} satisfies Story;
