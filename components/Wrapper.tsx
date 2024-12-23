'use client';
import React from 'react';
import { Provider as StatusProvider } from '@/contexts/Status';
import { Provider as UserProvider } from '@/contexts/User';
import useUser from '@/hooks/useUser';
import { Flex } from '@radix-ui/themes';
import Status from '@/components/Status';
import '@radix-ui/themes/styles.css';

type WrapperProps = React.PropsWithChildren<{
  variant?: 'centered' | 'top';
  withUser?: boolean;
}>;

const Inner = ({
  withUser,
  children,
}: React.PropsWithChildren<{ withUser?: boolean }>) => {
  const [user] = useUser(true);

  if (!withUser) return <StatusProvider>{children}</StatusProvider>;

  return (

    <StatusProvider>
      <UserProvider value={user}>
        {children}
        <Status />
      </UserProvider>
    </StatusProvider>

  );
};

const Wrapper = ({ variant = 'top', children, withUser }: WrapperProps) => {
  return (
    <Flex
      width="100%"
      direction="column"
      justify={variant === 'centered' ? 'center' : 'start'}
      align={variant === 'centered' ? 'center' : 'start'}
    >
      <Inner withUser={withUser}>{children}</Inner>
    </Flex>
  );
};

export default Wrapper;
