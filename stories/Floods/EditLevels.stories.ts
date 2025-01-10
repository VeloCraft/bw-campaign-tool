import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import EditLevels from '@/components/Floods/EditLevels';

seed('Floods/EditLevels');

const meta = {
  title: 'Floods/EditLevels',
  component: EditLevels,
} satisfies Meta<typeof EditLevels>;

export default meta;
type Story = StoryObj<typeof EditLevels>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
