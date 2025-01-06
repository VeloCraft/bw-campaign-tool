//@/components/Goals/Add.tsx
import React from 'react';
import Form from '@/components/Goals/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import { arrayUnion } from 'firebase/firestore';

type AddProps = ButtonProps & {
  docId: string;
};

const Add = ({ docId, ...props }: AddProps) => {
  const [open, setOpen] = React.useState(false);
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`, true);

  const onSubmit = async (values: Record<string, string>) => {
    const goalId = Math.random().toString(36).substring(7);
    const newGoal = { ...values, createdAt: new Date(), id: goalId };
    await onUpdate({ goals: arrayUnion(newGoal), updatedAt: new Date() }); // Update Firestore data
    setOpen(false);
  };

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title="Add a goal"
      description="Enter the details of the goal"
      data-testid="add-goal-button"
      {...props}
    />
  );
};

export default Add;
