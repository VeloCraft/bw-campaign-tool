
'use client';

import { Table, Flex, Link } from '@radix-ui/themes';


type ListProps = {
  documents?: string[];
  loading: boolean;
};

const List = ({ documents = [], loading }: ListProps) => {
  if (loading) return null;

  return (
    <Table.Root width="100%">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Size</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {documents?.map((document) => (
          <Table.Row align="center" key={document.id}>
            <Table.Cell width="100%"><Link href={document.secure_url}>{document.display_name}</Link></Table.Cell>
            <Table.Cell>{document.bytes}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default List;
