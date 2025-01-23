import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import Filter from '@/components/Floods/Filter';

seed('Floods/Filter');

const meta = {
  title: 'Floods/Filter',
  component: Filter,
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof Filter>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithAllValue = {
  args: {
    onChange: () => {},
    editable: false,
    value: 'all',
  },
} satisfies Story;

export const WithFloodedValue = {
  args: {
    ...WithAllValue.args,
    value: 'flooded',
  },
} satisfies Story;

export const AsEditable = {
  args: {
    ...WithAllValue.args,
    editable: true,
  },
} satisfies Story;
