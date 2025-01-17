import type { Meta, StoryObj } from '@storybook/react';
import { seed } from '@/.storybook/faker';
import EditorInstructions from '@/components/Floods/EditorInstructions';

seed('Floods/EditorInstructions');

const meta = {
  title: 'Floods/EditorInstructions',
  component: EditorInstructions,
} satisfies Meta<typeof EditorInstructions>;

export default meta;
type Story = StoryObj<typeof EditorInstructions>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const Opened = {
  args: {
    open: true,
  },
} satisfies Story;
