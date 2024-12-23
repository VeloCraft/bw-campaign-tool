
'use client';

import { Flex, Heading, Box, Text } from '@radix-ui/themes';
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
<Heading size="4">Campaign Goals</Heading>
            {/* Render campaign goals */}
            <Box flexGrow="1">
              {goals?.map((goal) => (
                <Flex 
                direction="row" 
                style={{
                  borderBottom: '0.5px solid gray',

                }}
                align="center" key={goal.id} my="2" px="0" pb="2">
                  <Text mr="0.5em" size="5">{goal.name}</Text>
                  <Text size="1">{goal.description}</Text>

                  <Edit size="1" ml="auto" docId={docId} goalId={goal.id} variant="outline" >
                    <Pencil2Icon />
                  </Edit>
                  <Delete size="1" ml="2px" docId={docId} goalId={goal.id} variant="outline" color="red" >
                    <TrashIcon />
                  </Delete>
                </Flex>
              ))}
              <AddGoal size="1" docId={docId}>Add goal</AddGoal>
              </Box>
              </>
)
}

export default List;

