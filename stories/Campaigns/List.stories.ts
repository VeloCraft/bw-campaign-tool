import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import List from '@/components/Campaigns/List';

seed('Campaigns/List');

const meta = {
  title: 'Campaigns/List',
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithCampaigns = {
  args: {
    campaigns: generate('campaign', { count: 12 }) as Campaign[],
  },
} satisfies Story;

export const Loading = {
  args: {
    loading: true,
  },
} satisfies Story;

export const Empty = {
  args: {
    campaigns: [],
  },
} satisfies Story;
