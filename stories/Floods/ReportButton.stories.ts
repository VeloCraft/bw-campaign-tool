import type { Meta, StoryObj } from '@storybook/react';
import { seed, title, description } from '@/.storybook/faker';
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
    label: title(),
    description: description(),
    onClick: () => {},
    onLongPress: () => {},
  },
} satisfies Story;

export const AsRed = {
  args: {
    ...WithValue.args,
    color: 'red',
  },
} satisfies Story;
