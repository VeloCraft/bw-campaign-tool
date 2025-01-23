import {
  Flex,
  IconButton,
  Button,
  AlertDialog,
  type ButtonProps,
} from '@radix-ui/themes';

type RemoveRouteProps = ButtonProps & {
  onClick: () => Promise<void>;
};

const RemoveRoute = ({ onClick, ...props }: RemoveRouteProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton {...props} />
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Remove this route</AlertDialog.Title>
        <AlertDialog.Description>
          Removing this route will delete it from the database. Are you sure you
          want to continue?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onClick} variant="solid" color="red">
              Remove
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default RemoveRoute;
