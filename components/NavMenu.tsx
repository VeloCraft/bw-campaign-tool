'use client';
import React from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Box, IconButton, Link } from '@radix-ui/themes';
import NextLink from 'next/link';

type NavMenuProps = {
  links: {
    href: string;
    label: string;
  }[];
};

const NavMenu = ({ links }: NavMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Box asChild display={{ initial: 'inline-block', sm: 'none' }}>
        <IconButton onClick={onOpen}>
          <HamburgerMenuIcon />
        </IconButton>
      </Box>
      {open && (
        <Box
          style={{
            backgroundColor: 'var(--accent-1)',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0.89,
          }}
          onClick={onClose}
        />
      )}
      <Box
        display={{ initial: 'inline-block', sm: 'none' }}
        position="fixed"
        top="0"
        right="0"
        height="100%"
        width="200px"
        p="4"
        style={{
          transform: `translateX(${open ? 0 : 100}%)`,
          transition: 'transform 0.2s',
          zIndex: 1,
          boxShadow: `var(--shadow-4)`,
          backgroundColor: 'var(--background)',
        }}
      >
        {links.map(({ href, label }) => (
          <Box asChild key={href} >
            <Link asChild >
              <NextLink href={href}>{label}</NextLink>
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default NavMenu;
