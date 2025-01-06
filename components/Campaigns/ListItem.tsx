import React from 'react';
import NextLink from 'next/link';
import { Skeleton, Table, Flex, Link } from '@radix-ui/themes';
import Edit from '@/components/Campaigns/Edit';
import Delete from '@/components/Campaigns/Delete';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import StatusBadge from '@/components/Campaigns/StatusBadge';

type ListItemProps = {
  loading: boolean;
  docId: string;
} & Campaign;

const ListItem = ({
  loading,
  name,
  description,
  status,
  contribution,
  docId,
}: Partial<ListItemProps>) => {
  if (loading)
    return (
      <Table.Row>
        <Skeleton>
          <Table.Cell colSpan={3} />
        </Skeleton>
      </Table.Row>
    );
  if (!docId)
    return (
      <Table.Row>
        <Table.Cell colSpan={3}>No campaigns found</Table.Cell>
      </Table.Row>
    );
  return (
    <Table.Row align="center" key={docId}>
      <Table.Cell width="100%">
        <Link asChild>
          <NextLink shallow href={`/campaigns/${docId}`}>
            {name}
          </NextLink>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <StatusBadge status={status} />
      </Table.Cell>
      <Table.Cell>
        <Flex direction="row" align="center" gap="2">
          <Edit
            docId={docId}
            name={name}
            description={description}
            status={status}
            contribution={contribution}
            variant="soft"
            color="green"
          >
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
