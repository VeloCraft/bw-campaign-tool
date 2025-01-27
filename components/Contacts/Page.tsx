'use client';

import { Heading, Flex, Box, Container } from '@radix-ui/themes';
import Add from '@/components/Contacts/Add';
import List from '@/components/Contacts/List';
import SignInWrapper from '@/components/SignInWrapper';

type ContactsProps = {
  contacts: Contact[];
  user?: User;
};

const Contacts = ({ user, contacts: _contacts }: ContactsProps) => {
  return (
    <SignInWrapper force user={user} breadcrumbs={[{ label: 'Contacts' }]}>
      <Container size="3">
        <Flex direction="row" align="center" justify="center" mt="8">
          <Heading>Contacts</Heading>
          <Box flexGrow="1" />
          <Add>Add Contact</Add>
        </Flex>
        <List editable contacts={_contacts} />
      </Container>
    </SignInWrapper>
  );
};

export default Contacts;
