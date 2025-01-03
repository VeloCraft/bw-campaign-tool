import React from 'react';
import Form from '@/components/Actions/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import { auth } from '@/helpers/firebase';

const Edit = ({ docId, ...props }: ButtonProps & { docId: string }) => {
  const { data, loading } = useFirestoreDoc<Action>(`actions/${docId}`, true);
  const [onUpdate] = useUpdateDoc(`actions/${docId}`);
  const [open, setOpen] = React.useState(false);
  const [resource, setResource] = React.useState(null);
  const onAddMessage = useStatusUpdate();

  React.useEffect(() => {
    if (open && data?.media) {
      setResource(data.media);
    }
  }, [open, data]);

  const authUser = auth.currentUser;

  if (loading) return null;
  //

  const onSubmit = async (values: FormSubmission) => {
    const newValues = {
      ...values,
      user: {},
      campaign: {},
      media: resource,
    };

    //add current authenticated user to the action?
    newValues.user = {
      id: authUser?.uid,
      name: authUser?.displayName,
      email: authUser?.email,
    };

    //maintain campaign assignment
    newValues.campaign = data.campaign;
    await onUpdate(newValues);
    onAddMessage({ message: 'Action updated', variant: 'success' });
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, campaign, user, media, ...initialValues } = (data ||
    {}) as Action;

  //set default initialValues if they are not set for status and assignee

  if (!initialValues.status) {
    initialValues.status = 'pending';
  }

  //initialValues.createdAt = initialValues.createdAt.toISOString();

  if (!initialValues.assigneeId) {
    initialValues.assigneeId = 'none';
  }

  return (
    <Form
      resource={resource}
      setResource={setResource}
      campaign={campaign}
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
