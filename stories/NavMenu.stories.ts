import type { Meta, StoryObj } from '@storybook/react';
import faker, { arrayOf, oneOf, seed } from '@/.storybook/faker';
import NavMenu from '@/components/NavMenu';
import { click } from '@/.storybook/play';

seed('NavMenu');

const meta = {
  title: 'NavMenu',
  component: NavMenu,
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof NavMenu>;

export const WithLinks = {
  args: {
    links: arrayOf(
      () => ({
        label: faker.lorem.words(2),
        href: `/${faker.lorem.word()}`,
      }),
      { min: 6, max: 12 },
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} satisfies Story;

export const Opened = {
  ...WithLinks,
  play: click('testId', 'nav-menu'),
} satisfies Story;

const active = oneOf(Opened.args.links).href;

export const OpenedWithActive = {
  ...Opened,
  args: {
    links: Opened.args.links.map((link) =>
      link.href === active ? { ...link, active: true } : link,
    ),
  },
} satisfies Story;
