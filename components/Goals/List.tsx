'use client';

import { Table } from '@radix-ui/themes';
import AddGoal from '@/components/Goals/Add';
import ListItem from '@/components/Goals/ListItem';

type ListProps = {
  goals?: Goal[];
  loading: boolean;
  docId: string;
};

const List = ({ goals = [], loading, docId }: ListProps) => {
  if (loading) return null;

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Goal</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!docId || goals?.length === 0 ? (
            <ListItem />
          ) : loading ? (
            <ListItem loading />
          ) : (
            goals?.map((goal) => (
              <ListItem key={goal.id} goals={goals} goal={goal} docId={docId} />
            ))
          )}
        </Table.Body>
      </Table.Root>
      <AddGoal mt="2" size="1" docId={docId}>
        Add goal
      </AddGoal>
    </>
  );
};

export default List;
