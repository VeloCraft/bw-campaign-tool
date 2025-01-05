'use client';
import React from 'react';
import { Provider as StatusProvider } from '@/contexts/Status';
import { Flex } from '@radix-ui/themes';
import Status from '@/components/Status';
import '@radix-ui/themes/styles.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Inner = ({ children }: { children: any }) => {
  return (
    <StatusProvider>
      {children}
      <Status />
    </StatusProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Wrapper = ({ children }: { children: any }) => {
  return (
    <Flex width="100%" direction="column" justify="start" align="start">
      <Inner>{children}</Inner>
    </Flex>
  );
};

export default Wrapper;
