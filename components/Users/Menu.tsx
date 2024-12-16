'use client';
import React from 'react';
import {
  Text,
  DropdownMenu,
  Avatar,
  IconButton,
  Flex,
  Card,
  Box,
} from '@radix-ui/themes';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import SignInMenu from '@/components/Users/SignInMenu';

const Menu = () => {
  const session = useSession();
  const signedIn = session.status === 'authenticated' ? true : false;

  const user = session.data?.user;
  if (!signedIn) return <SignInMenu />;

  const letter =
    user?.name?.charAt(0) || user?.email?.charAt(0) || user?.id?.charAt(0);

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton>
            <Avatar fallback={letter} src={user.image} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="1">
          <Card>
            <Flex gap="3" align="center">
              <Avatar size="3" fallback={letter} src={user.image} />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {user.name || user.email}
                </Text>
                {!!user.name && (
                  <Text as="div" size="2" color="gray">
                    {user.email}
                  </Text>
                )}
              </Box>
            </Flex>
          </Card>
          <DropdownMenu.Separator />
          <DropdownMenu.Item asChild>
            <Link shallow href="/profile">
              Edit profile
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={onSignOut}>Sign out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default Menu;
