import { Flex, Button, AlertDialog, type ButtonProps } from '@radix-ui/themes';

type CurrentLevelProps = ButtonProps & {
  onClick: () => Promise<void>;
};

const CurrentLevel = ({ onClick, ...props }: CurrentLevelProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button {...props} />
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Set to current level</AlertDialog.Title>
        <AlertDialog.Description>
          Set the flood level for this route to the current level?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onClick} variant="solid">
              Set
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CurrentLevel;
