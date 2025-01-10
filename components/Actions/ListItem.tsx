import React from 'react';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import Delete from '@/components/Actions/Delete';
import Edit from '@/components/Actions/Edit';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import { Skeleton, Flex, Table } from '@radix-ui/themes';
import StatusBadge from '@/components/StatusBadge';

type ListItemProps = {
  docId: string;
  loading: boolean;
} & Action;

const ListItem = ({
  docId,
  status,
  dateSet,
  action,
  userId,
  assigneeId,
  updatedAt,
  createdAt,
  assigneeEmail,
  loading: _loading,
}: Partial<ListItemProps>) => {
  const { data: user, loading: userLoading } = useFirestoreDoc<User>(
    `users/${userId}`,
  );

  const { data: assignee, loading: assigneeLoading } = useFirestoreDoc<User>(
    `users/${assigneeId}`,
  );

  const dateStr = React.useMemo(() => dateSet?.toLocaleDateString(), [dateSet]);
  const loading = _loading || userLoading || assigneeLoading;
  if (loading)
    return (
      <Table.Row>
        <Skeleton>
          <Table.Cell colSpan={5} />
        </Skeleton>
      </Table.Row>
    );
  if (!docId)
    return (
      <Table.Row>
        <Table.Cell colSpan={5}>No actions found</Table.Cell>
      </Table.Row>
    );
  return (
    <Table.Row>
      <Table.Cell>
        <StatusBadge status={status} />
      </Table.Cell>
      <Table.Cell>{action}</Table.Cell>
      <Table.Cell>{dateStr}</Table.Cell>
      <Table.Cell>{user.displayName || user.email}</Table.Cell>
      <Table.Cell>{assigneeId != 'other' ? (assignee.displayName || assignee.email) : assigneeEmail}</Table.Cell>
      <Table.Cell>
        <Flex direction="row" align="center" gap="2">
          <Edit docId={docId} variant="soft" color="green">
            <Pencil2Icon />
          </Edit>
          <Delete docId={docId} variant="soft" color="red">
            <TrashIcon />
          </Delete>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default ListItem;
