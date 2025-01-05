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
  loading?: boolean;
};

const AppWrapper = ({
  breadcrumbs,
  actions,
  children,
  loading,
}: AppWrapperProps) => {
  return (
    <Wrapper>
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
        <Box height="100%" p="4">
          {children}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default AppWrapper;
