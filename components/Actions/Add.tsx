//@/components/Goals/Add.tsx
import React from 'react';
import Form from '@/components/Actions/Form';

import { db } from '@/helpers/firebase';

import { addDoc, collection } from 'firebase/firestore';
import { type ButtonProps } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';

type UserDetails = {
  id: string;
  name: string;
  email: string;
};

const Add = ({
  campaign,
  user,
  ...props
}: ButtonProps & {
  campaign: CampaignDetails;
  user: UserDetails;
}) => {
  const [open, setOpen] = React.useState(false);
  const [resource, setResource] = React.useState(null);
  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: Record<string, string>) => {
    const newValues = {
      ...values,
      createdAt: new Date(),
      user: user,
      campaign: campaign,
      media: resource,
    };

    await addDoc(collection(db, 'actions'), newValues);
    onAddMessage({ message: 'Action added', variant: 'success' });
    setResource(null);
    setOpen(false);
  };

  const initialValues = {
    action: null,
    dateSet: new Date().toISOString().split('T')[0],
    status: 'pending',
    assigneeId: 'none',
  };

  return (
    <Form
      campaign={campaign}
      initialValues={initialValues}
      open={open}
      setOpen={setOpen}
      resource={resource}
      setResource={setResource}
      onSubmit={onSubmit as any} // eslint-disable-line
      title={`Add an action to ${campaign.name}`}
      description="Enter the details of the action"
      onCancel={() => {
        setResource(null);
        setOpen(false);
      }}
      {...props}
    />
  );
};

export default Add;
