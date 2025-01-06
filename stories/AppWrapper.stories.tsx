import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import AppWrapper from '@/components/AppWrapper';
import { Button } from '@radix-ui/themes';

seed('AppWrapper');

const meta = {
  title: 'AppWrapper',
  component: AppWrapper,
} satisfies Meta<typeof AppWrapper>;

export default meta;
type Story = StoryObj<typeof AppWrapper>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithChildren = {
  args: {
    children: faker.lorem.paragraphs(3),
  },
} satisfies Story;

export const WithBreadcrumbs = {
  args: {
    breadcrumbs: [
      { label: 'Campaigns', href: '/campaigns' },
      { label: 'Campaign Name' },
    ],
  },
} satisfies Story;

export const WithActions = {
  args: {
    actions: <Button>{faker.lorem.words(2).toUpperCase()}</Button>,
  },
} satisfies Story;

export const Loading = {
  args: {
    loading: true,
  },
} satisfies Story;
