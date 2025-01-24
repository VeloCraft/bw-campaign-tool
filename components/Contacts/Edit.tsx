import { type ButtonProps } from '@radix-ui/themes';
import React from 'react';
import Form from '@/components/Contacts/Form';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

type EditProps = ButtonProps & {
  docId: string;
};

const Edit = ({ docId, ...props }: EditProps) => {
  const { data, loading } = useFirestoreDoc<Contact>(`contacts/${docId}`, true);
  const [open, setOpen] = React.useState(false);
  const [onUpdate] = useUpdateDoc(`contacts/${docId}`, true);
  if (loading) {
    return null;
  }

  const onSubmit = async (values: Record<string, string>) => {
    const newContact = { ...values, createdAt: new Date() };
    await onUpdate(newContact);
    setOpen(false);
  };

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title="Edit contact" //ideally would reference the campaign name if possible
      initialValues={data}
      data-testid="edit-contact-button"
      {...props}
    />
  );
};

export default Edit;
