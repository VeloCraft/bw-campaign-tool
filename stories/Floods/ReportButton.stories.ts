import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import ReportButton from '@/components/Floods/ReportButton';

seed('Floods/ReportButton');

const meta = {
  title: 'Floods/ReportButton',
  component: ReportButton,
} satisfies Meta<typeof ReportButton>;

export default meta;
type Story = StoryObj<typeof ReportButton>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
