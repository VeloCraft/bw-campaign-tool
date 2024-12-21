
import React from 'react';
import Form from '@/components/Actions/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import { auth } from '@/helpers/firebase';

const Edit = ({ docId, ...props }: ButtonProps & { docId: string }) => {
  const { data, loading } = useFirestoreDoc<Action>(`actions/${docId}`);
  const [onUpdate] = useUpdateDoc(`actions/${docId}`);
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const authUser = auth.currentUser;
  if (loading) return null;
  //

  const onSubmit = async (values: FormSubmission) => {
    const newValues = { ...values, user: {}, campaign: {}, createdAt: new Date() };

    //add current authenticated user to the action?
    newValues.user = {
      id: authUser?.uid,
      name: authUser?.displayName,
      email: authUser?.email,
    }

    //maintain campaign assignment
    newValues.campaign = data.campaign
    await onUpdate(newValues);
    onAddMessage({ message: 'Action updated', variant: 'success' });
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, campaign, user,  ...initialValues } = (data || {}) as Action;

  return (
    <Form
      open={open}
      setOpen={setOpen}
      initialValues={initialValues}
      onSubmit={onSubmit as any} // eslint-disable-line
      disabled={loading}
      title={`Edit action`}
      description="Update the details of the action"
      {...props}
    />
  );
};

export default Edit;
