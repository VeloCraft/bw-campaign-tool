import React from 'react';
import NextLink from 'next/link';
import { Box, Link } from '@radix-ui/themes';
import NavMenu from '@/components/NavMenu';

const links = [
  { href: '/', label: 'Home' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/admin', label: 'Admin' },
];

const Navigation = () => {
  return (
    <>
      {links.map(({ href, label }) => (
        <Box
          asChild
          display={{
            initial: 'none',
            sm: 'inline-block',
          }}
          key={href}
        >
          <Link asChild>
            <NextLink href={href}>{label}</NextLink>
          </Link>
        </Box>
      ))}
      <NavMenu links={links} />
    </>
  );
};

export default Navigation;
