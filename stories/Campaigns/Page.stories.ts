import type { Meta, StoryObj } from '@storybook/react';
import faker, { generate, seed } from '@/.storybook/faker';
import Page from '@/components/Campaigns/Page';

seed('Campaigns/Page');

const meta = {
  title: 'Campaigns/Page',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof Page>;

export const WithNoUser = {
  args: {},
} satisfies Story;

export const WithUser = {
  args: {
    user: generate('user') as User,
  },
} satisfies Story;

export const WithCampaignId = {
  ...WithUser,
  parameters: {
    nextjs: {
      navigation: {
        segments: [['id', faker.string.uuid()]],
      },
    },
  },
} satisfies Story;
