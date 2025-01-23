'use client';
import React from 'react';
import { Provider as StatusProvider } from '@/contexts/Status';
import { Flex } from '@radix-ui/themes';
import Status from '@/components/Status';
import '@radix-ui/themes/styles.css';

type WrapperProps = {
  noStatus?: boolean;
};

const Inner = ({
  children,
  noStatus,
}: React.PropsWithChildren<WrapperProps>) => {
  if (noStatus) return <>{children}</>;
  return (
    <StatusProvider>
      {children}
      <Status />
    </StatusProvider>
  );
};

const Wrapper = ({
  noStatus,
  children,
}: React.PropsWithChildren<WrapperProps>) => {
  return (
    <Flex
      height="100dvh"
      width="100%"
      direction="column"
      justify="start"
      align="start"
      overflowY="auto"
    >
      <Inner noStatus={noStatus}>{children}</Inner>
    </Flex>
  );
};

export default Wrapper;
