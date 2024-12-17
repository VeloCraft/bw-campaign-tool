import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import { Flex, Button, type ButtonProps, AlertDialog } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';

const Delete = ({ docId, ...props }: ButtonProps & { docId: string }) => {
  const onAddMessage = useStatusUpdate();
  const onDelete = async () => {
    await deleteDoc(doc(db, `campaigns/${docId}`));
    onAddMessage({ message: 'Campaign deleted', variant: 'success' });
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
