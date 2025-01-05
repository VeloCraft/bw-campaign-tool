import type { Meta, StoryObj } from '@storybook/react';
import faker, { seed } from '@/.storybook/faker';
import Status from '@/components/Status';
import statusDecorator from '@/.storybook/statusDecorator';

seed('Status');

const meta = {
  title: 'Status',
  component: Status,
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof Status>;

export const WithInfoMessage = {
  args: {},
  decorators: [
    statusDecorator({
      message: faker.lorem.sentence(),
      variant: 'info',
      duration: 0,
    }),
  ],
} satisfies Story;

export const WithSuccessMessage = {
  args: {},
  decorators: [
    statusDecorator({
      message: faker.lorem.sentence(),
      variant: 'success',
      duration: 0,
    }),
  ],
} satisfies Story;

export const WithErrorMessage = {
  args: {},
  decorators: [
    statusDecorator({
      message: faker.lorem.sentence(),
      variant: 'error',
      duration: 0,
    }),
  ],
} satisfies Story;
