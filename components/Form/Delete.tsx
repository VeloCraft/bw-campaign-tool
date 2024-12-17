import React from 'react';
import * as Form from '@radix-ui/react-form';
import { Flex, AlertDialog, Button, type ButtonProps } from '@radix-ui/themes';

type SubmitProps = ButtonProps & {
  label?: string;
  message?: string;
  title?: string;
  okLabel?: string;
  onDelete: () => Promise<void>;
};

const Delete = ({
  label = 'Delete',
  title = 'Delete this item?',
  message,
  okLabel = 'Delete',
  onDelete: ondelete,
  ...buttonProps
}: SubmitProps) => {
  const [deleting, setDeleting] = React.useState(false);
  const onDelete = async () => {
    setDeleting(true);
    await ondelete();
    setDeleting(false);
  };
  return (
    <Form.Submit asChild>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="outline" color="red" {...buttonProps}>
            {label}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>{title}</AlertDialog.Title>
          {message && (
            <AlertDialog.Description size="2">
              {message}
            </AlertDialog.Description>
          )}

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                loading={deleting}
                disabled={deleting}
                onClick={onDelete}
              >
                {okLabel}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Form.Submit>
  );
};

export default Delete;
