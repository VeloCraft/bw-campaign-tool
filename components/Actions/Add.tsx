
//@/components/Goals/Add.tsx
import React from 'react';
import Form from '@/components/Actions/Form';

import { db } from '@/helpers/firebase';

import { addDoc, collection } from 'firebase/firestore';
import { type ButtonProps } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';

//define campaign detail type and user detial type - pass to component?
type CampaignDetails = {
  name: string;
  id: string;
}

type UserDetails = {
  id: string;
  name: string;
  email: string;
}

const Add = ({campaign, user, ...props} : ButtonProps & {campaign: CampaignDetails, user: UserDetails}) => {
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();


  const onSubmit = async (values: Record<string, string>) => {
    const newValues = { ...values, createdAt: new Date(), user: user,  campaign: campaign };
    await addDoc(collection(db, 'actions'), newValues);
    onAddMessage({ message: 'Action added', variant: 'success' });
    setOpen(false);
  };

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any} // eslint-disable-line
      title={`Add an action to ${campaign.name}`}
      description="Enter the details of the action"
      {...props}
    />
  );
};


export default Add;
