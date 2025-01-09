import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import EditorInstructions from '@/components/TrafficSpeed/EditorInstructions';

seed('TrafficSpeed/EditorInstructions');

const meta = {
  title: 'TrafficSpeed/EditorInstructions',
  component: EditorInstructions,
} satisfies Meta<typeof EditorInstructions>;

export default meta;
type Story = StoryObj<typeof EditorInstructions>;

export const WithDefaults = {
  args: {},
} satisfies Story;

export const WithValue = {
  args: {
    title: faker.lorem.sentence(),
  },
} satisfies Story;
