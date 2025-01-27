'use client';

import { Table } from '@radix-ui/themes';
import Item from '@/components/Contacts/ListItem';
import { documentId, orderBy, where } from 'firebase/firestore';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';

type ListProps = {
  contactIds?: string[];
  editable?: boolean;
  contacts?: Contact[];
};

const List = ({ contactIds, editable, contacts: _contacts }: ListProps) => {
  const { data } = useFirestoreCollection<Contact>(
    'contacts',
    true,
    ...(contactIds ? [where(documentId(), 'in', contactIds)] : []),
    orderBy('fullName'),
  );

  const contacts = (data || _contacts)?.filter(
    (contact) => !contactIds || contactIds?.includes(contact.id),
  );

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>E-mail</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Organisation</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell colSpan={editable ? 2 : 1}>
              Role
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contacts?.map((contact: Contact) => (
            <Item
              editable={!!editable}
              key={contact.id}
              docId={contact.id}
              {...contact}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default List;
