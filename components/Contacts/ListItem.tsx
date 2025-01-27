import React from 'react';
import { Table, Flex } from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Edit from '@/components/Contacts/Edit';

type ListItemProps = Contact & {
  docId: string;
  editable?: boolean;
};

const ListItem = ({
  email,
  fullName,
  phone,
  organisation,
  role,
  docId,
  editable,
}: Partial<ListItemProps>) => {
  return (
    <Table.Row align="center">
      <Table.Cell>{fullName}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{phone}</Table.Cell>
      <Table.Cell>{organisation}</Table.Cell>
      <Table.Cell>{role}</Table.Cell>
      {editable && (
        <Table.Cell>
          <Flex direction="row" align="center" gap="2">
            <Edit docId={docId} variant="soft" color="green">
              <Pencil2Icon />
            </Edit>
          </Flex>
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default ListItem;
