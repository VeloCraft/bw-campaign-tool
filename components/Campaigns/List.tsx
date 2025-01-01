'use client';

import NextLink from 'next/link';
import { Table, Flex, Link } from '@radix-ui/themes';
import Edit from '@/components/Campaigns/Edit';
import Delete from '@/components/Campaigns/Delete';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import StatusBadge from '@/components/StatusBadge';

type ListProps = {
  campaigns?: Campaign[];
  loading: boolean;
};

const List = ({ campaigns = [], loading }: ListProps) => {
  if (loading) return null;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {campaigns?.map((campaign) => (
          <Table.Row align="center" key={campaign.id}>
            <Table.Cell width="100%">
              <Link asChild>
                <NextLink shallow href={`/campaigns/${campaign.id}`}>
                  {campaign.name}
                </NextLink>
              </Link>
            </Table.Cell>
            <Table.Cell>
              <StatusBadge status={campaign.status} />
            </Table.Cell>
            <Table.Cell>
              <Flex direction="row" align="center" gap="2">
                <Edit docId={campaign.id} variant="soft">
                  <Pencil2Icon />
                </Edit>
                <Delete docId={campaign.id} variant="soft" color="red">
                  <TrashIcon />
                </Delete>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default List;
