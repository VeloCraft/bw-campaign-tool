import React from 'react';
import Form from '@/components/Users/Form';
import { type ButtonProps } from '@radix-ui/themes';

type EditProps = ButtonProps & {
  onUpdate: ({ email, role }: { email: string; role: string }) => Promise<void>;
  onDelete: () => Promise<void>;
  roles?: string[];
  email: string;
  role: string;
};

const Edit = ({
  roles,
  role,
  email,
  onDelete,
  onUpdate,
  ...props
}: EditProps) => {
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: FormSubmission) => {
    const { email, role } = values as { email: string; role: string };
    try {
      await onUpdate({ email, role });
      setOpen(false);
    } catch (error) {} // eslint-disable-line
  };

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onDelete={onDelete}
      initialValues={{ email, role }}
      onSubmit={onSubmit as any} // eslint-disable-line
      roles={roles}
      title="Edit user role"
      description="Update the role of the user"
      {...props}
    />
  );
};

export default Edit;
