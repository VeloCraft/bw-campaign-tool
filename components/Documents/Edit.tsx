import { type ButtonProps } from '@radix-ui/themes';
import React from 'react';
import Form from '@/components/Documents/Form';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

type EditProps = ButtonProps & {
  docId: string;
};

const Edit = ({ docId, ...props }: EditProps) => {
  const { data } = useFirestoreDoc<DocumentDoc>(`documents/${docId}`, true);
  const [open, setOpen] = React.useState(false);
  const [onUpdate] = useUpdateDoc(`documents/${docId}`, true);

  const onSubmit = async (values: Record<string, string>) => {
    const newDoc = { ...values, createdAt: new Date() };
    await onUpdate(newDoc);
    setOpen(false);
  };

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title="Edit document" //ideally would reference the campaign name if possible
      description="Update the details of the document"
      initialValues={data}
      data-testid="edit-document-button"
      {...props}
    />
  );
};

export default Edit;
