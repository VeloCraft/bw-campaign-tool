import React from 'react';
import Form from '@/components/Campaigns/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useStatusUpdate from '@/hooks/useStatusUpdate';

const Edit = ({ docId, ...props }: ButtonProps & { docId: string }) => {
  const { data, loading } = useFirestoreDoc<Campaign>(`campaigns/${docId}`);
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`);
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: FormSubmission) => {
    const newValues = { ...values, createdAt: new Date() };
    await onUpdate(newValues);
    onAddMessage({ message: 'Campaign updated', variant: 'success' });
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, goals, ...initialValues } = (data || {}) as Campaign;

  return (
    <Form
      open={open}
      setOpen={setOpen}
      initialValues={initialValues}
      onSubmit={onSubmit as any} // eslint-disable-line
      disabled={loading}
      title={`Edit campaign: ${initialValues?.name}`}
      description="Update the details of the campaign"
      {...props}
    />
  );
};

export default Edit;
