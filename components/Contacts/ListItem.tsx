import React from 'react';
import { Table, Link, Flex } from '@radix-ui/themes';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import Edit from '@/Components/Contacts/Edit';
import Delete from '@/Components/Contacts/Delete';

type ListItemProps = Contact & {
  docId: string;
};

const ListItem = ({
  email,
  full_name,
  phone,
  organisation,
  role,
  docId,
}: Partial<ListItemProps>) => {
  return (
    <Table.Row align="center">
      <Table.Cell>{full_name}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{phone}</Table.Cell>
      <Table.Cell>{organisation}</Table.Cell>
      <Table.Cell>{role}</Table.Cell>
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