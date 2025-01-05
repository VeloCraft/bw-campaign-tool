import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import MediaInfo from '@/components/Form/MediaInfo';

seed('Form/MediaInfo');

const meta = {
  title: 'Form/MediaInfo',
  component: MediaInfo,
} satisfies Meta<typeof MediaInfo>;

export default meta;
type Story = StoryObj<typeof MediaInfo>;

export const WithValue = {
  args: {
    media: generate('media') as Media,
  },
} satisfies Story;
