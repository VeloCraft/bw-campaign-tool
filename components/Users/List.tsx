'use client';
import React from 'react';
import { Heading, Flex, Box, Container, Table } from '@radix-ui/themes';
import SignInWrapper from '@/components/SignInWrapper';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import Add from '@/components/Users/Add';
import Edit from '@/components/Users/Edit';
import useStatusUpdate from '@/hooks/useStatusUpdate';

const List = () => {
  const { data, loading } = useFirestoreDoc<AppRoles>('app/roles', true);
  const { data: permissions, loading: permsLoading } =
    useFirestoreDoc<AppPermissions>('app/permissions');
  const [onUpdateDoc] = useUpdateDoc(`app/roles`);
  const onAddMessage = useStatusUpdate();

  const onUpdate = async ({
    email: _email,
    role,
    delete: del,
  }: {
    email: string;
    role?: string;
    delete?: boolean;
  }) => {
    const email = _email.trim().toLowerCase();
    const oldRole = Object.keys(permissions).find((role) =>
      data[role]?.includes(email),
    );
    const newValues = {};
    if (oldRole) newValues[oldRole] = arrayRemove(email);
    if (role) newValues[role] = arrayUnion(email);
    console.log({ oldRole, role, email, newValues });
    await onUpdateDoc(newValues);
    if (!del) onAddMessage({ message: 'User updated', variant: 'success' });
  };

  const onAdd = async ({
    email: _email,
    role,
  }: {
    email: string;
    role: string;
  }) => {
    const email = _email.trim().toLowerCase();
    if (Object.keys(data).some((key) => data[key].includes(email))) {
      onAddMessage({ message: 'User already exists', variant: 'error' });
      throw new Error('User already exists');
    }
    await onUpdateDoc({ [role]: arrayUnion(email) });
    onAddMessage({ message: 'User added', variant: 'success' });
  };

  const onDelete = (email: string) => async () => {
    await onUpdate({ email, delete: true });
    onAddMessage({ message: 'User deleted', variant: 'success' });
  };

  const [items, roles] = React.useMemo(() => {
    if (!data || !permissions) return [[], []];
    return [
      Object.keys(data)
        .filter((key) => key !== 'id')
        .reduce((acc, key) => {
          return [
            ...acc,
            ...data[key].map((email: string) => ({
              role: key,
              email,
              key: `${key}.${email}`,
            })),
          ];
        }, [])
        .sort((a, b) => a.email.localeCompare(b.email)),
      Object.keys(permissions).filter((key) => key !== 'id'),
    ];
  }, [permissions, data]);

  return (
    <SignInWrapper
      force
      loading={loading || permsLoading}
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]}
    >
      <Container size="3">
        <Flex direction="row" align="center" justify="center" mt="8">
          <Heading>Admin: Users</Heading>
          <Box flexGrow="1" />
          <Add roles={roles} onAdd={onAdd}>
            Add User
          </Add>
        </Flex>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Roles</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map(({ role, email, key }) => (
              <Table.Row align="center" key={key}>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{role}</Table.Cell>
                <Table.Cell>
                  <Edit
                    roles={roles}
                    onUpdate={onUpdate}
                    onDelete={onDelete(email)}
                    email={email}
                    role={role}
                    variant="soft"
                  >
                    Edit
                  </Edit>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </SignInWrapper>
  );
};

export default List;
