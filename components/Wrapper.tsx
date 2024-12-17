'use client';
import React from 'react';
import { Provider as StatusProvider } from '@/contexts/Status';
import { Provider as UserProvider } from '@/contexts/User';
import useUser from '@/hooks/useUser';

const Wrapper = ({
  withUser,
  children,
}: React.PropsWithChildren<{ withUser: boolean }>) => {
  const [user] = useUser(true);

  if (!withUser) return <StatusProvider>{children}</StatusProvider>;

  return (
    <StatusProvider>
      <UserProvider value={user}>{children}</UserProvider>
    </StatusProvider>
  );
};

export default Wrapper;
