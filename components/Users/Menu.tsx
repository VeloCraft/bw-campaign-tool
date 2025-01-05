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
import { auth } from '@/helpers/firebase';
import { signOut } from 'firebase/auth';
import { redirect } from 'next/navigation';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import userContext from '@/contexts/User';

const Menu = () => {
  const user = React.useContext<User>(userContext);
  const signedIn = !!user;
  const onAddMessage = useStatusUpdate();

  if (!signedIn) return null;

  const letter =
    user?.displayName?.charAt(0) ||
    user?.email?.charAt(0) ||
    user?.id?.charAt(0);

  const onSignOut = async () => {
    await signOut(auth);
    onAddMessage({ message: 'You are now signed out', variant: 'success' });
    redirect('/');
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton>
            <Avatar fallback={letter} src={user.photoURL} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="1">
          <Card>
            <Flex gap="3" align="center">
              <Avatar size="3" fallback={letter} src={user.photoURL} />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {user.displayName || user.email}
                </Text>
                {!!user.displayName && (
                  <Text as="div" size="2" color="gray">
                    {user.email}
                  </Text>
                )}
              </Box>
            </Flex>
          </Card>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={onSignOut}>Sign out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default Menu;
