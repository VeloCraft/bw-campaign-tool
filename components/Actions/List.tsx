'use client';

import { Table } from '@radix-ui/themes';
import { where, orderBy, limit } from 'firebase/firestore';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import { useParams } from 'next/navigation';

import ListItem from '@/components/Actions/ListItem';


const List = () => {
  const { id: campaignId }: { id: string } = useParams();
  const { data: actions, loading } = useFirestoreCollection<Action>(
    campaignId ? 'actions' : null,
    true,
    where('campaignId', '==', campaignId),
    orderBy('createdAt', 'desc'),
    limit(5),
  );

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

        {!campaignId || actions?.length === 0 ? (
          <ListItem />
        ) : loading ? (
          <ListItem loading />
        ) : (
          actions?.map((action) => (
            <ListItem key={action.id} docId={action.id} {...action} />
          ))
        )}

      </Table.Body>
    </Table.Root>
  );
};

export default List;
