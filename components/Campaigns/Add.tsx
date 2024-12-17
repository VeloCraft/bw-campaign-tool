import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import Form from '@/components/Campaigns/Form';
import { type ButtonProps } from '@radix-ui/themes';

const Add = (props: ButtonProps) => {
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: Record<string, string>) => {
    const newValues = { ...values, createdAt: new Date() };
    console.log(newValues);
    await addDoc(collection(db, 'campaigns'), newValues);
    setOpen(false);
  };

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any} // eslint-disable-line
      title="Add a campaign"
      description="Enter the details of the campaign"
      {...props}
    />
  );
};

export default Add;
