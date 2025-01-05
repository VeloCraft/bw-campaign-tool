import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import Form from '@/components/Campaigns/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';

const Add = (props: ButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: Record<string, string>) => {
    const newValues = { ...values, createdAt: new Date() };
    await addDoc(collection(db, 'campaigns'), newValues);
    onAddMessage({ message: 'Campaign added', variant: 'success' });
    setOpen(false);
  };

  return (
    <Form
      data-testid="add-campaign-button"
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
