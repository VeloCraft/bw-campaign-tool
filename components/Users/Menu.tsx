'use client';
import React, {useEffect, useState} from 'react';
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
import SignInMenu from '@/components/Users/SignInMenu';
import {auth} from '@/helpers/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';

//what is equivalent of session in firebase auth? 


const Menu = () => {
  const [authUser, setAuthUser] = useState(null);


  useEffect(() => {
    const authlistener = onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthUser(user);
    } else {
      setAuthUser(null);}
  });
    return () => {
      authlistener();
    }
  },[])
  
  const user = authUser;
  console.log(user)
  if (!authUser) return <SignInMenu />;

  const letter =
    user?.displayName?.charAt(0) || user?.email?.charAt(0) || user?.id?.charAt(0);

  const onSignOut = async () => {
    await signOut(auth);
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
