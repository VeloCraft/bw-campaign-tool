import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import Form from '@/components/Contacts/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';

const Add = (props: ButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: Record<string, string>) => {
    const newValues = { ...values, createdAt: new Date() };
    await addDoc(collection(db, 'contacts'), newValues);
    onAddMessage({ message: 'Contact added', variant: 'success' });
    setOpen(false);
  };

  return (
    <Form
      data-testid="add-contact-button"
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title="Add a contact"
      {...props}
    />
  );
};

export default Add;
