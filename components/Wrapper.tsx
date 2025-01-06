'use client';
import React from 'react';
import { Provider as StatusProvider } from '@/contexts/Status';
import { Flex } from '@radix-ui/themes';
import Status from '@/components/Status';
import '@radix-ui/themes/styles.css';

const Inner = ({ children }: { children: any }) => {
  return (
    <StatusProvider>
      {children}
      <Status />
    </StatusProvider>
  );
};

const Wrapper = ({ children }: { children: any }) => {
  return (
    <Flex width="100%" direction="column" justify="start" align="start">
      <Inner>{children}</Inner>
    </Flex>
  );
};

export default Wrapper;
