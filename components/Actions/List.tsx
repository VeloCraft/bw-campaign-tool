'use client';

import { Text, Flex, Table } from '@radix-ui/themes';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import Delete from '@/components/Actions/Delete';
import Edit from '@/components/Actions/Edit';
import { where, orderBy, limit } from 'firebase/firestore';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import { useParams } from 'next/navigation';
import StatusBadge from '@/components/StatusBadge';

const List = () => {
  const { id }: { id: string } = useParams();
  const { data: actions, loading } = useFirestoreCollection<Action>(
    id ? 'actions' : null,
    true,
    where('campaign.id', '==', id),
    orderBy('createdAt', 'desc'),
    limit(5),
  );

  if (loading) return null;
  if (actions?.length === 0) return <Text>No actions found</Text>;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>

          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Assigned to</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created by</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {actions?.map((action) => (
          <Table.Row key={action.id}>
            <Table.Cell>
              <StatusBadge status={action?.status} />
            </Table.Cell>
            <Table.Cell>{action.action}</Table.Cell>
            <Table.Cell>{action.dateSet || 'N/A'}</Table.Cell>
            <Table.Cell>{action.assigneeId || 'None'}</Table.Cell>
            <Table.Cell>{action.user.name || action.user.email}</Table.Cell>
            <Table.Cell>
              <Flex direction="row" align="center" gap="2">
                <Delete docId={action.id} variant="soft" color="red">
                  <TrashIcon />
                </Delete>
                <Edit docId={action.id} variant="soft" color="gray">
                  <Pencil2Icon />
                </Edit>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default List;
