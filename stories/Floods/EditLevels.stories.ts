import type { Meta, StoryObj } from '@storybook/react';
import { generate, seed } from '@/.storybook/faker';
import EditLevels from '@/components/Floods/EditLevels';
import { click } from '@/.storybook/play';

seed('Floods/EditLevels');

const meta = {
  title: 'Floods/EditLevels',
  component: EditLevels,
} satisfies Meta<typeof EditLevels>;

export default meta;
type Story = StoryObj<typeof EditLevels>;

const stations = generate('station', { count: 5 }) as Station[];

export const WithValue = {
  args: {
    disabled: false,
    onClose: () => {},
    onRemove: async () => {},
    onSetCurrent: async () => {},
    onUpdate: async () => {},
    stations,
    route: generate('route', { stations }) as Route,
  },
} satisfies Story;

export const disabled = {
  args: {
    ...WithValue.args,
    disabled: true,
  },
} satisfies Story;

export const DeleteClicked = {
  ...WithValue,
  play: click('testId', 'delete-route-button'),
} satisfies Story;

export const SetCurrentClicked = {
  ...WithValue,
  play: click('testId', 'set-route-current-button'),
} satisfies Story;

export const EditClicked = {
  ...WithValue,
  play: click('testId', 'edit-route-button'),
} satisfies Story;
