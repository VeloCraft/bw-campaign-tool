import React from 'react';
import Form from '@/components/Campaigns/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

const Edit = ({ docId, ...props }: ButtonProps & { docId: string }) => {
  const { data, loading } = useFirestoreDoc<Campaign>(`campaigns/${docId}`);
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`);
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: FormSubmission) => {
    const newValues = { ...values, createdAt: new Date() };
    await onUpdate(newValues);
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...initialValues } = (data || {}) as Campaign;

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
