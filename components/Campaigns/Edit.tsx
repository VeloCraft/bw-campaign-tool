import React from 'react';
import Form from '@/components/Campaigns/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useStatusUpdate from '@/hooks/useStatusUpdate';

type EditProps = ButtonProps &
  Partial<Campaign> & {
    docId: string;
    loading?: boolean;
  };

const Edit = ({
  docId,
  name,
  description,
  status,
  contribution,
  loading,
  ...props
}: EditProps) => {
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`);
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: FormSubmission) => {
    const newValues = { ...values, updatedAt: new Date() };
    await onUpdate(newValues);
    onAddMessage({ message: 'Campaign updated', variant: 'success' });
    setOpen(false);
  };

  const initialValues = {
    name,
    description,
    status,
    contribution,
  };

  return (
    <Form
      data-testid="edit-campaign-button"
      open={open}
      setOpen={setOpen}
      initialValues={initialValues}
      disabled={loading}
      onSubmit={onSubmit as any}
      title={`Edit campaign: ${name}`}
      description="Update the details of the campaign"
      {...props}
    />
  );
};

export default Edit;
