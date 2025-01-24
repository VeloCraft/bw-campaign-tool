import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import index from '@/components/Campaigns/index';

seed('Campaigns/index');

const meta = {
  title: 'Campaigns/index',
  component: index,
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof index>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithUser = {
  args: {
    user: generate('user') as User,
  },
} satisfies Story;

export const WithCampaigns = {
  args: {
    ...WithUser.args,
    campaigns: generate('campaign', { count: 5 }) as Campaign[],
  },
} satisfies Story;
