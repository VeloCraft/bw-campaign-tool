'use client';
import React from 'react';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import Add from '@/components/Campaigns/Add';
import List from '@/components/Campaigns/List';
import SignInWrapper from '@/components/SignInWrapper';
import { Heading, Flex, Box, Container } from '@radix-ui/themes';

type ComponentProps = {
  campaigns: Campaign[];
  user?: User;
};

const Component = ({ campaigns: _campaigns, user }: ComponentProps) => {
  const { data, loading: _loading } = useFirestoreCollection<Campaign>(
    'campaigns',
    true,
  );
  const campaigns = !_loading ? data || _campaigns : _campaigns;
  const loading = !_campaigns && _loading;
  return (
    <SignInWrapper
      force
      loading={loading}
      breadcrumbs={[{ label: 'Campaigns' }]}
      user={user}
    >
      <Container size="3">
        <Flex direction="row" align="center" justify="center" mt="8">
          <Heading>Campaigns</Heading>
          <Box flexGrow="1" />
          <Add>Add Campaign</Add>
        </Flex>
        <List campaigns={campaigns} loading={loading} />
      </Container>
    </SignInWrapper>
  );
};

export default Component;
