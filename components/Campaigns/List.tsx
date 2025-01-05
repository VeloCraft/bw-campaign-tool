'use client';

import { Table } from '@radix-ui/themes';
import ListItem from '@/components/Campaigns/ListItem';

type ListProps = {
  campaigns?: Campaign[];
  loading?: boolean;
};

const List = ({ campaigns = [], loading }: ListProps) => {
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
        {loading ? (
          <ListItem loading />
        ) : campaigns?.length === 0 ? (
          <ListItem />
        ) : (
          campaigns?.map((campaign) => (
            <ListItem key={campaign.id} docId={campaign.id} {...campaign} />
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default List;
