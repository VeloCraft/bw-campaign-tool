
'use client';

import { Table, Link } from '@radix-ui/themes';
import Delete from '@/components/Documents/Delete'
import {TrashIcon} from '@radix-ui/react-icons'



type ListProps = {
  documents: MediaRecord[];
  loading: boolean;
};

const List = ({ documents = [], loading }: ListProps) => {
  if (loading) return null;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {documents?.map((document) => (
          <Table.Row align="center" key={document.public_id}>
            <Table.Cell width="100%"><Link href={document.secure_url}>{document.display_name}</Link></Table.Cell>
            <Table.Cell>
                <Delete docId={document.id} variant="soft" color="red">
                  <TrashIcon />
                </Delete>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default List;
