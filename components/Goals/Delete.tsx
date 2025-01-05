import { Flex, Button, type ButtonProps, AlertDialog } from '@radix-ui/themes';
import useUpdateDoc from '@/hooks/useUpdateDoc';

type DeleteProps = ButtonProps & {
  docId: string;
  goalId: string;
  goals: Goal[];
};

const Delete = ({ docId, goalId, goals, ...props }: DeleteProps) => {
  const [onUpdate] = useUpdateDoc(`campaigns/${docId}`, true);

  const onDelete = async () => {
    await onUpdate({ goals: goals.filter(({ id }) => id !== goalId) });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button data-testid="delete-goal-button" {...props} />
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete this goal?</AlertDialog.Title>
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
