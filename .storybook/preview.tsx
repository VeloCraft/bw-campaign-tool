import React from 'react';
import type { Preview } from '@storybook/react';
import localFont from 'next/font/local';
import { Box } from '@radix-ui/themes';
import Theme from '@/components/Theme';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      defaultViewport: 'reset',
    },
  },
  decorators: [
    (Story) => (
      <Theme
        wrapper={Box}
        m="0"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {Story()}
      </Theme>
    ),
  ],
};

export default preview;
