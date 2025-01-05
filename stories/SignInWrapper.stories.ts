import type { Meta, StoryObj } from '@storybook/react';
import faker, { generate, seed } from '@/.storybook/faker';
import SignInWrapper from '@/components/SignInWrapper';

seed('SignInWrapper');

const meta = {
  title: 'SignInWrapper',
  component: SignInWrapper,
} satisfies Meta<typeof SignInWrapper>;

export default meta;
type Story = StoryObj<typeof SignInWrapper>;

export const WithDefaults = {
  args: {},
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/campaigns',
      },
    },
  },
} satisfies Story;

export const WithChildren = {
  ...WithDefaults,
  args: {
    children: faker.lorem.paragraph(3),
  },
} satisfies Story;

export const WithBreadcrumbs = {
  ...WithChildren,
  args: {
    ...WithChildren.args,
    breadcrumbs: [
      { label: 'Campaigns', href: '/campaigns' },
      { label: faker.lorem.words(2) },
    ],
  },
} satisfies Story;

export const Loading = {
  ...WithChildren,
  args: {
    ...WithChildren.args,
    loading: true,
  },
} satisfies Story;

export const ForceUser = {
  ...WithChildren,
  args: {
    ...WithChildren.args,
    force: true,
  },
} satisfies Story;

export const ForcedUserAndSignedIn = {
  ...WithChildren,
  args: {
    ...WithChildren.args,
    user: generate('user') as User,
    force: true,
  },
} satisfies Story;

export const UnauthorisedUser = {
  ...WithChildren,
  args: {
    ...WithChildren.args,
    force: true,
    user: { ...(generate('user') as User), roles: ['editor'] },
    role: 'admin',
  },
} satisfies Story;
