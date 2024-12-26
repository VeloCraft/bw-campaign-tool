
'use client';

import { Flex, Heading, Table, Strong } from '@radix-ui/themes';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import Delete from '@/components/Goals/Delete'
import AddGoal from '@/components/Goals/Add'
import Edit from '@/components/Goals/Edit'

type ListProps = {
  goals?: Goal[];
  loading: boolean;
  docId: string;
};

const List = ({ goals = [], loading, docId }: ListProps) => {
  if (loading) return null;

return (
<>
<Heading size="4">Goals</Heading>
            {/* Render campaign goals */}
    <Table.Root>
    {/*<Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          {/*<Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>*/}
      <Table.Body>
        {goals?.map((goal) => (
          <Table.Row align="center" key={goal?.id}>
            <Table.Cell width="100%"><Strong>{goal.name}</Strong></Table.Cell>
            {/*<Table.Cell>{goal.description}</Table.Cell>*/}
            <Table.Cell>
              <Flex direction="row" align="center" gap="2">
                  <Edit size="1" ml="auto" docId={docId} goalId={goal.id} variant="outline" >
                    <Pencil2Icon />
                  </Edit>
                  <Delete size="1" ml="2px" docId={docId} goalId={goal.id} variant="outline" color="red" >
                    <TrashIcon />
                  </Delete>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
              <AddGoal mt="2" size="1" docId={docId}>Add goal</AddGoal>
              </>
)
}

export default List;

