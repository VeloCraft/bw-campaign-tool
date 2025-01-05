import React from 'react';
import Form from '@/components/Actions/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

const Edit = ({ docId, ...props }: ButtonProps & { docId: string }) => {
  const { data, loading } = useFirestoreDoc<Action>(`actions/${docId}`, true);
  const [onUpdate] = useUpdateDoc(`actions/${docId}`, true);
  const [open, setOpen] = React.useState(false);

  if (loading) return null;

  const onSubmit = async (values: FormSubmission) => {
    await onUpdate(values);
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, campaignId, userId, ...initialValues } = (data || {}) as Action;

  return (
    <Form
      data-testid="edit-action-button"
      open={open}
      setOpen={setOpen}
      campaignId={campaignId}
      initialValues={initialValues}
      onSubmit={onSubmit as any} // eslint-disable-line
      disabled={loading}
      title="Edit action"
      description="Update the details of the action"
      {...props}
    />
  );
};

export default Edit;
