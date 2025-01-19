import React from 'react';

import Form from '@/components/Documents/Form';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import { type ButtonProps } from '@radix-ui/themes';

type EditProps = ButtonProps &
  Partial<MediaRecord> & {
    docId: string;
  };

const EditDescription = ({
  docId,
  description,
  display_name,
  ...props
}: EditProps) => {
  const [onUpdate] = useUpdateDoc(`media/${docId}`, true);
  const [open, setOpen] = React.useState(false);

  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: FormSubmission) => {
    const newValues = { ...values, updatedAt: new Date() };
    console.log(newValues);
    await onUpdate(newValues);
    onAddMessage({ message: 'Document updated', variant: 'success' });
    setOpen(false);
  };

  const initialValues = {
    description,
    display_name,
  };

  return (
    <Form
      data-testid="edit-description-button"
      open={open}
      setOpen={setOpen}
      initialValues={initialValues}
      onSubmit={onSubmit as any}
      //disabled={loading}
      title="Edit description"
      description="Update the description of the document"
      {...props}
    />
  );
};

export default EditDescription;
