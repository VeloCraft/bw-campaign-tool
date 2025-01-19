import React from 'react';
import { Table, Link, Flex } from '@radix-ui/themes';
import Delete from '@/components/Documents/Delete';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import EditDescription from './EditDescription';

type ListItemProps = MediaRecord & {
  docId: string;
};

const ListItem = ({
  url,
  display_name,
  description,
  docId,
}: Partial<ListItemProps>) => {
  return (
    <Table.Row align="center">
      <Table.Cell>
        <Link href={url}>{display_name}</Link>
      </Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>
        <Flex direction="row" align="center" gap="2">
          <EditDescription
            docId={docId}
            description={description}
            display_name={display_name}
            variant="soft"
            color="green"
          >
            <Pencil2Icon />
          </EditDescription>
          <Delete docId={docId} variant="soft" color="red">
            <TrashIcon />
          </Delete>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default ListItem;
