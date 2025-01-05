import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import StatusBadge from '@/components/Campaigns/StatusBadge';

seed('StatusBadge');

const meta = {
  title: 'Campaigns/StatusBadge',
  component: StatusBadge,
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const AsActive = {
  args: {
    status: 'active',
  },
} satisfies Story;

export const AsInactive = {
  args: {
    status: 'inactive',
  },
} satisfies Story;

export const AsLargeActive = {
  args: {
    ...AsActive.args,
    size: '3',
  },
} satisfies Story;
