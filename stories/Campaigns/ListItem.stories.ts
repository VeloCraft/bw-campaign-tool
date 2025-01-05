import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import ListItem from '@/components/Campaigns/ListItem';
import { click } from '@/.storybook/play';
import { Table } from '@radix-ui/themes';
import wrapper from '@/decorators/wrapper';

seed('Campaigns/ListItem');

const meta = {
  title: 'Campaigns/ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof ListItem>;

export const WithDefaults = {
  args: {},
  decorators: [wrapper(Table.Body), wrapper(Table.Root)],
} satisfies Story;

export const Loading = {
  ...WithDefaults,
  args: {
    loading: true,
  },
} satisfies Story;

const campaign = generate('campaign') as Campaign;

export const WithCampaign = {
  ...WithDefaults,
  args: {
    docId: campaign.id,
    ...campaign,
  },
} satisfies Story;

export const WithCampaignEdit = {
  ...WithCampaign,
  play: click('testId', 'edit-campaign-button'),
} satisfies Story;

export const WithCampaignDelete = {
  ...WithCampaign,
  play: click('testId', 'delete-campaign-button'),
} satisfies Story;
