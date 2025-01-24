'use client';

import { Heading, Flex, Box, Container } from '@radix-ui/themes';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import Add from '@/components/Contacts/Add';
import List from '@/components/Contacts/List';
import SignInWrapper from '@/components/SignInWrapper';

type ContactsProps = {
  contacts: Contact[];
  user?: User;
};

const Contacts = ({ user, contacts: _contacts }: ContactsProps) => {
  const { data, loading: _loading } = useFirestoreCollection<Contact>(
    'contacts',
    true,
  );
  const contacts = !_loading ? data || _contacts : _contacts;
  const loading = !_contacts && _loading;
  return (
    <SignInWrapper
      force
      user={user}
      loading={loading}
      breadcrumbs={[{ label: 'Contacts' }]}
    >
      <Container size="3">
        <Flex direction="row" align="center" justify="center" mt="8">
          <Heading>Contacts</Heading>
          <Box flexGrow="1" />
          <Add>Add Contact</Add>
        </Flex>
        <List contacts={contacts} />
      </Container>
    </SignInWrapper>
  );
};

export default Contacts;
