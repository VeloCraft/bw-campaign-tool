import { type ButtonProps } from '@radix-ui/themes';
import React from 'react';
import Form from '@/components/Contacts/Form';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useDeleteDoc from '@/hooks/useDeleteDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

type EditProps = ButtonProps & {
  docId: string;
};

const Edit = ({ docId, ...props }: EditProps) => {
  const { data } = useFirestoreDoc<Contact>(`contacts/${docId}`, true);
  const [open, setOpen] = React.useState(false);
  const [onUpdate] = useUpdateDoc(`contacts/${docId}`, true);
  const [onDelete] = useDeleteDoc(`contacts/${docId}`, true);

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
      description="Update the details of the contact"
      initialValues={data}
      data-testid="edit-contact-button"
      onDelete={onDelete}
      {...props}
    />
  );
};

export default Edit;
