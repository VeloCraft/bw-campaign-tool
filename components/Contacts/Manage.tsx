import React from 'react';
import Select from '@/components/Contacts/Select';
import { orderBy } from 'firebase/firestore';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';

type ManageProps = {
  campaignId: string;
  contactIds: string[];
};

const Manage = ({ campaignId, contactIds }: ManageProps) => {
  const { data } = useFirestoreCollection<Contact>(
    'contacts',
    false,
    orderBy('fullName', 'asc'),
  );
  return (
    <Select
      campaignId={campaignId}
      contacts={data}
      initialValues={{ contactIds }}
      data-testid="manage-contacts-button"
    >
      Manage contacts
    </Select>
  );
};

export default Manage;
