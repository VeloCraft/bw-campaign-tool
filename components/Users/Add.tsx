import React from 'react';
import Form from '@/components/Users/Form';
import { type ButtonProps } from '@radix-ui/themes';

type AddProps = ButtonProps & {
  roles?: string[];
  onAdd: (values: Record<string, string>) => Promise<void>;
};

const Component = ({ roles, onAdd, ...props }: AddProps) => {
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: Record<string, string>) => {
    try {
      await onAdd(values);
      setOpen(false);
    } catch (error) {} // eslint-disable-line
  };

  return (
    <Form
      open={open}
      roles={roles}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title="Add a user role assignment"
      description="Enter the email and select a role."
      data-testid="add-user-role-button"
      {...props}
    />
  );
};

export default Component;
