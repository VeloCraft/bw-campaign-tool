import React from 'react';
import { Progress, Separator, Box, Flex } from '@radix-ui/themes';
import Breadcrumbs from '@/components/Breadcrumbs';
import Wrapper from '@/components/Wrapper';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';

type AppWrapperProps = {
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'top' | 'centered';
  loading?: boolean;
  noPadding?: boolean;
};

const AppWrapper = ({
  variant,
  breadcrumbs,
  actions,
  children,
  loading,
  noPadding,
}: AppWrapperProps) => {
  return (
    <Wrapper variant={variant}>
      <Flex
        gap="3"
        direction="row"
        align="center"
        height="64px"
        width="100%"
        px="4"
        pt="3"
        wrap="wrap"
      >
        <Logo />
        {breadcrumbs?.length && <Breadcrumbs items={breadcrumbs} />}
        <Box flexGrow="1" />
        <Navigation />
        {actions}
        <Box flexGrow="1" flexBasis="100%">
          {loading ? (
            <Progress duration="0.5s" size="1" variant="soft" />
          ) : (
            <Separator size="4" />
          )}
        </Box>
      </Flex>
      <Box height="calc(100% - 64px)" width="100%">
        <Box height="100%" p={noPadding ? '0' : '4'}>
          {children}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default AppWrapper;
