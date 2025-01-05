import { type ButtonProps } from '@radix-ui/themes';
import React from 'react';
import Form from '@/components/Goals/Form';
import useUpdateDoc from '@/hooks/useUpdateDoc';

type EditProps = ButtonProps & {
  docId: string;
  goals: Goal[];
  goalId: string;
};

const Edit = ({ docId, goals, goalId, ...props }: EditProps) => {
  const [open, setOpen] = React.useState(false);
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`, true);

  const onSubmit = async (values: Record<string, string>) => {
    const newGoal = { ...values, createdAt: new Date(), id: goalId };
    await onUpdate({
      goals: goals.map((goal) => (goal.id === goalId ? newGoal : goal)),
    });
    setOpen(false);
  };

  const goal = goals.find((goal) => goal.id === goalId);
  if (!goal) return null;

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title="Edit goal" //ideally would reference the campaign name if possible
      description="Enter the details of the goal"
      initialValues={goal}
      data-testid="edit-goal-button"
      {...props}
    />
  );
};

export default Edit;
