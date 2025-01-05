import React from 'react';
import { Table, Link } from '@radix-ui/themes';
import Delete from '@/components/Documents/Delete';
import { TrashIcon } from '@radix-ui/react-icons';

type ListItemProps = Media & {
  docId: string;
};

const ListItem = ({ url, display_name, docId }: ListItemProps) => {
  return (
    <Table.Row align="center">
      <Table.Cell width="100%">
        <Link href={url}>{display_name}</Link>
      </Table.Cell>
      <Table.Cell>
        <Delete docId={docId} variant="soft" color="red">
          <TrashIcon />
        </Delete>
      </Table.Cell>
    </Table.Row>
  );
};

export default ListItem;
