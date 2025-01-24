'use client';

import { Table } from '@radix-ui/themes';
import Item from '@/components/Contacts/ListItem';

type ListProps = {
  contacts: Contact[];
};

const List = ({ contacts }: ListProps) => {
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>E-mail</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Organisation</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contacts?.map((contact) => (
            <Item key={contact.id} docId={contact.id} {...contact} />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default List;
