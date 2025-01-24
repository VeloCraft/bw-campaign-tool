import React from 'react';
import { Table, Link, Flex } from '@radix-ui/themes';
import Delete from '@/components/Documents/Delete';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import Edit from './Edit';

type ListItemProps = {
  document: DocumentDoc;
  docId: string;
};

const ListItem = ({ document, docId }: ListItemProps) => {
  return (
    <Table.Row align="center">
      <Table.Cell>
        <Link href={document.file.url}>
          {document.name ||
            document.file.display_name ||
            document.file.original_filename}
        </Link>
      </Table.Cell>
      <Table.Cell>{document.description}</Table.Cell>
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
