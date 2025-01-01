'use client';
import React from 'react';
import NextLink from 'next/link';
import { Box, Link } from '@radix-ui/themes';
import NavMenu from '@/components/NavMenu';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', active: (pathname) => pathname === '/' },
  {
    href: '/campaigns',
    label: 'Campaigns',
    active: (pathname) => pathname.startsWith('/campaigns'),
  },
  {
    href: '/admin',
    label: 'Admin',
    active: (pathname) => pathname.startsWith('/admin'),
  },
] as {
  href: string;
  label: string;
  active: (pathname: string) => boolean;
}[];

const Navigation = () => {
  const pathname = usePathname();
  const links = React.useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        active: link.active(pathname),
      })),
    [pathname],
  );
  return (
    <>
      {links.map(({ href, label, active }) => (
        <Box
          asChild
          display={{
            initial: 'none',
            sm: 'inline-block',
          }}
          key={href}
        >
          <Link
            asChild
            underline="none"
            style={{
              borderBottom: `2px solid ${active ? 'var(--accent-8)' : 'transparent'}`,
            }}
          >
            <NextLink href={href}>{label}</NextLink>
          </Link>
        </Box>
      ))}
      <NavMenu links={links} />
    </>
  );
};

export default Navigation;
