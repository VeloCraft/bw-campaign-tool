'use client';

import { Table } from '@radix-ui/themes';
import { orderBy, where } from 'firebase/firestore';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import Item from '@/components/Documents/ListItem';

type ListProps = {
  campaignId: string;
};

const List = ({ campaignId }: ListProps) => {
  const { data: documents, loading } = useFirestoreCollection<Media>(
    'media',
    true,
    where('tags', 'array-contains', campaignId),
    orderBy('created_at', 'desc'),
  );
  if (loading) return null;

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {documents?.map((document) => (
            <Item
              key={document.public_id}
              docId={document.public_id}
              {...document}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default List;
