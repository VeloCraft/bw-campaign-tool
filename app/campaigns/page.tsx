'use client';

import { Heading, Flex, Box, Container } from '@radix-ui/themes';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import Add from '@/components/Campaigns/Add';
import List from '@/components/Campaigns/List';
import SignInWrapper from '@/components/SignInWrapper';

export default function CampaignsPage() {
  const { data, loading } = useFirestoreCollection<Campaign>('campaigns', true);

  return (
    <SignInWrapper
      force
      loading={loading}
      breadcrumbs={[{ label: 'Campaigns' }]}
    >
      <Container size="3">
        <Flex direction="row" align="center" justify="center" mt="8">
          <Heading>Campaigns</Heading>
          <Box flexGrow="1" />
          <Add>Add Campaign</Add>
        </Flex>
        <List campaigns={data} loading={loading} />
      </Container>
    </SignInWrapper>
  );
}
