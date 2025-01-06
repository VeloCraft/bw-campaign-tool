import type { Meta, StoryObj } from '@storybook/react';
import faker, { arrayOf, seed } from '@/.storybook/faker';
import Breadcrumbs from '@/components/Breadcrumbs';

seed('Breadcrumbs');

const meta = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    items: [
      ...arrayOf(() => ({
        label: faker.lorem.words(2),
        href: faker.internet.url(),
      })),
      { label: faker.lorem.words(2) },
    ],
  },
} satisfies Story;
