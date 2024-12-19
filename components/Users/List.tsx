'use client';
import React from 'react';
import { Heading, Flex, Box, Container, Table } from '@radix-ui/themes';
import SignInWrapper from '@/components/SignInWrapper';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

const roles = {
  user: 'User',
  admin: 'Admin',
  manager: 'Manager',
};

const List = () => {
  const { data, loading } = useFirestoreDoc<App>('app/root', true);
  const [onUpdateDoc, saving] = useUpdateDoc(`app/root`);

  const onAdd = async (email: string) => {
    await onUpdateDoc({ user: arrayUnion(email) });
  };

  const onUpdate = async (email: string, newRoles: string[] = []) => {
    const oldRoles = Object.keys(roles).filter((role) =>
      roles[role].includes(email),
    );
    const removedRoles = oldRoles.filter((role) => !newRoles.includes(role));
    const addedRoles = newRoles.filter((role) => !oldRoles.includes(role));
    const newValues = {};
    removedRoles.forEach((role) => {
      newValues[role] = arrayRemove(email);
    });
    addedRoles.forEach((role) => {
      newValues[role] = arrayUnion(email);
    });
    await onUpdateDoc(newValues);
  };

  const [users, allRoles] = React.useMemo(() => {
    if (!data) return [[], []];
    return [
      data.user.map((email) => ({
        email,
        roles: Object.keys(roles).filter(
          (role) => role !== 'user' && roles[role].includes(email),
        ),
      })),
      Object.keys(data),
    ];
  }, [data]);

  return (
    <SignInWrapper force loading={loading}>
      <Container size="3">
        <Flex direction="row" align="center" justify="center" mt="8">
          <Heading>Admin: Users</Heading>
          <Box flexGrow="1" />
          {/*<Add onAdd={onAdd}>Add User</Add>*/}
        </Flex>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Roles</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(({ email, roles }) => (
              <Table.Row key={email}>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{roles.join(', ')}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </SignInWrapper>
  );
};

export default List;
