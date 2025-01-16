import React from 'react';
import { Table, Flex, Skeleton } from '@radix-ui/themes';
import Edit from '@/components/Goals/Edit';
import Delete from '@/components/Goals/Delete';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import StatusBadge from '@/components/StatusBadge';

type ListItemProps = {
  loading?: boolean;
  docId?: string;
  goals?: Goal[];
  goal?: Goal;
};

const ListItem = ({
  loading,
  goal: { id: goalId, name, status } = {} as Goal,
  goals,
  docId,
}: ListItemProps) => {
  if (loading)
    return (
      <Table.Row>
        <Skeleton>
          <Table.Cell colSpan={3} />
        </Skeleton>
      </Table.Row>
    );
  if (!docId)
    return (
      <Table.Row>
        <Table.Cell colSpan={3}>No goals found</Table.Cell>
      </Table.Row>
    );
  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <StatusBadge status={status} />
      </Table.Cell>
      <Table.Cell>
        <Flex direction="row" align="center" gap="2">
          <Edit
            docId={docId}
            goalId={goalId}
            goals={goals}
            variant="soft"
            color="green"
          >
            <Pencil2Icon />
          </Edit>
          <Delete
            docId={docId}
            goalId={goalId}
            goals={goals}
            variant="soft"
            color="red"
          >
            <TrashIcon />
          </Delete>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default ListItem;
