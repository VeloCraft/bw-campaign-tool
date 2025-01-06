import React from 'react';
import Form from '@/components/Users/Form';
import { type ButtonProps } from '@radix-ui/themes';

type EditProps = ButtonProps & {
  onUpdate: ({ email, role }: { email: string; role: string }) => Promise<void>;
  onDelete: () => Promise<void>;
  roles?: string[];
  email: string;
  allRoles: string[];
};

const Edit = ({
  roles,
  allRoles,
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
      initialValues={{ email, roles }}
      onSubmit={onSubmit as any}
      roles={allRoles}
      title="Edit user roles"
      description="Update the roles of the user"
      data-testid="edit-user-roles-button"
      {...props}
    />
  );
};

export default Edit;
