'use client';

import { Heading, Flex, Box, Container } from '@radix-ui/themes';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import Add from '@/components/Contacts/Add';
import List from '@/components/Contacts/List';
import SignInWrapper from '@/components/SignInWrapper';

export default function Contacts() {
  const { data, loading } = useFirestoreCollection<Campaign>('contacts', true);

  return (
    <SignInWrapper
      force
      loading={loading}
      breadcrumbs={[{ label: 'Contacts' }]}
    >
      <Container size="3">
        <Flex direction="row" align="center" justify="center" mt="8">
          <Heading>Contacts</Heading>
          <Box flexGrow="1" />
          <Add>Add Contact</Add>
        </Flex>
        <List contacts={data} loading={loading} />
      </Container>
    </SignInWrapper>
  );
}
