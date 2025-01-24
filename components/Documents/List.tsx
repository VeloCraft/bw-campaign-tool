'use client';

import { Table } from '@radix-ui/themes';
import { where } from 'firebase/firestore';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import Item from '@/components/Documents/ListItem';

type ListProps = {
  campaignId: string;
};

const List = ({ campaignId }: ListProps) => {
  const { data: documents, loading } = useFirestoreCollection<DocumentDoc>(
    'documents',
    true,
    where('campaignId', '==', campaignId),
  );
  if (loading) return null;

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {documents?.map((document) => (
            <Item key={document.id} docId={document.id} document={document} />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default List;
