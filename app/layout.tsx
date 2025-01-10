import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import Wrapper from '@/components/Wrapper';
import Theme from '@/components/Theme';

export const metadata: Metadata = {
  title: 'Bike Worcester Campaigns',
  description: 'Tools for managing local active travel campaigns',
};

const jostSans = Jost({
  variable: '--font-jost-sans',
  subsets: ['latin'],
});

const jostMono = Jost({
  variable: '--font-jost-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ height: '100dvh' }}>
      <Theme
        wrapper="body"
        className={`${jostSans.variable} ${jostMono.variable} antialiased`}
        style={{ margin: 0, height: '100dvh' }}
      >
        <Wrapper>{children}</Wrapper>
      </Theme>
    </html>
  );
}
