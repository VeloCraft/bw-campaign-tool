import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import List from '@/components/Actions/List';

seed('Actions/List');

const meta = {
  title: 'Actions/List',
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithCampaignId = {
  args: {},
  parameters: {
    nextjs: {
      navigation: {
        segments: [['id', faker.string.uuid()]],
      },
    },
  },
} satisfies Story;
