

'use client';

import {Flex, Table } from '@radix-ui/themes';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import Delete from '@/components/Actions/Delete'
import Edit from '@/components/Actions/Edit'

type ListProps = {
  actions: Action[];
  loading: boolean;
};

const List = ({ actions, loading }: ListProps) => {
  if (loading) return null;

  console.log(actions[0])

return (
    <Table.Root> 
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Campaign</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {actions?.map((action) => (
        
          <Table.Row key={action.id}>
            <Table.Cell>{action.action}</Table.Cell>
            <Table.Cell>{action.campaign.name}</Table.Cell>
            <Table.Cell>{action.user.name || action.user.email}</Table.Cell>
            <Table.Cell>
              <Flex direction="row" align="center" gap="2">
                <Delete docId={action.id} variant="soft" color="red">
                  <TrashIcon />
                </Delete>
                <Edit docId={action.id} variant="soft" color="gray">
                  <Pencil2Icon />
                </Edit>
                </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default List;

