//@/components/Goals/Add.tsx
import React from 'react';
import Form from '@/components/Goals/Form';
import { type ButtonProps } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useUpdateDoc from '@/hooks/useUpdateDoc';

const Add = ({docId, ...props} : ButtonProps & {docId : string}) => {
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const { data, loading } = useFirestoreDoc<Campaign>(`campaigns/${docId}`);
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`);

  if (loading) {
    return null;
  }

  if (!data.goals) {
    data.goals = [];
  }

  const goals = data.goals; 

  const onSubmit = async (values: Record<string, string>) => {
    const goalId = Math.random().toString(36).substring(7);
    const newGoal = { ...values, createdAt: new Date(), id : goalId };
    
    if (loading) {
      return;
    }

    const updatedGoals = [...goals, newGoal];

    const updatedData = { ...data, goals: updatedGoals };
    await onUpdate(updatedData); // Update Firestore data

    onAddMessage({ message: 'Goal added', variant: 'success' });
    setOpen(false);  
  };

  return (
    <Form
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any} // eslint-disable-line
      title="Add a goal" //ideally would reference the campaign name if possible
      description="Enter the details of the goal"
      {...props}
    />
  );
};

export default Add;
