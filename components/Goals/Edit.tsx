
import { type ButtonProps } from '@radix-ui/themes';
import React from 'react';
import Form from '@/components/Goals/Form';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useUpdateDoc from '@/hooks/useUpdateDoc';

const Edit = ({ docId, goalId, ...props }: ButtonProps & { docId: string, goalId: string }) => {
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  //get the doc

  const { data, loading } = useFirestoreDoc<Campaign>(`campaigns/${docId}`);
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`);
  
  if (loading) {
    return null;
  }
  //get the goals
  const goals = data?.goals;

  const existingGoal = goals.find((goal) => goal.id === goalId);

  if (!existingGoal) {
    return null;
  }

  const {...initialValues } = (existingGoal || {}) as Goal;

  const onSubmit = async (values: Record<string, string>) => {
    const newGoal = { ...values, createdAt: new Date(), id : goalId };
  //remove the goal from the list
    const newGoals = goals.filter((goal) => goal.id !== goalId);
    
    const updatedGoals = [...newGoals, newGoal];

    const updatedData = { ...data, goals: updatedGoals };
    await onUpdate(updatedData); // Update Firestore data

    onAddMessage({ message: 'Goal edited', variant: 'success' });
    setOpen(false);  
  };


    return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any} // eslint-disable-line
      title="Edit goal" //ideally would reference the campaign name if possible
      description="Enter the details of the goal"
      initialValues={initialValues}

      {...props}
    />
  );};

export default Edit;
