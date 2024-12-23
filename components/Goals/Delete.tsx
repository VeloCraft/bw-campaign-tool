import { Flex, Button, type ButtonProps, AlertDialog } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import useUpdateDoc from '@/hooks/useUpdateDoc';

const Delete = ({ docId, goalId, ...props }: ButtonProps & { docId: string, goalId: string }) => {
  const onAddMessage = useStatusUpdate();

  //get the doc

  const { data, loading } = useFirestoreDoc<Campaign>(`campaigns/${docId}`);
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`);
  
  if (loading) {
    return null;
  }
  //get the goals

  const onDelete = async () => {
    const goals = data?.goals;
    console.log('oldData', data)

    const newGoals = goals.filter((goal) => goal.id !== goalId);
  
    //update the doc with the new goals
    const updatedData = { ...data, goals: newGoals };

    console.log('newData', updatedData)
    await onUpdate(updatedData); // Update Firestore data
    onAddMessage({ message: 'Goal deleted', variant: 'success' });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button {...props} />
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete this campaign?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone.
        </AlertDialog.Description>
        <Flex direction="row" justify="end" gap="2">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="soft" color="red" onClick={onDelete}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Delete;
