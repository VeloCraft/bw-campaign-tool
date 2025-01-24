import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import Form from '@/components/Documents/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';

type AddProps = ButtonProps & {
  campaignId: string;
};

const Add = ({ campaignId, ...props }: AddProps) => {
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: Record<string, string>) => {
    const newValues = { ...values, campaignId, createdAt: new Date() };
    await addDoc(collection(db, 'documents'), newValues);
    onAddMessage({ message: 'Document added', variant: 'success' });
    setOpen(false);
  };

  return (
    <Form
      data-testid="add-document-button"
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title="Add a document"
      description="Enter the details of the document"
      {...props}
    />
  );
};

export default Add;
