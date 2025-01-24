import {
  Flex,
  Box,
  Text,
  Dialog,
  Button,
  type ButtonProps,
} from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';
import { useState } from 'react';

type ComponentProps = ButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: string[];
  onSubmit: (values: FormSubmission) => Promise<void>;
  contacts: Contact[];
};

const Component = ({
  initialValues = {},
  onSubmit,
  contacts,
  ...props
}: ComponentProps) => {
  const [selectedContactIds, setSelectedContactIds] = useState(initialValues);

  const [open, setOpen] = useState(false);
  const handleContactSelect = (contactId) => {
    // Prevent adding the same contact multiple times
    const newContactId = contactId.target.value;
    if (!selectedContactIds.includes(newContactId)) {
      setSelectedContactIds((prev) => [...prev, newContactId]);
    }
  };

  const handleContactRemove = (contactId: string) => {
    setSelectedContactIds((prev) => prev.filter((id) => id !== contactId));
  };

  const handleSubmit = (event: FormDataEvent) => {
    event.preventDefault();
    onSubmit(selectedContactIds);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button {...props} />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Assign contacts to campaign</Dialog.Title>
        <Dialog.Description>
          List of useful contacts for this campaign
        </Dialog.Description>
        <Form
          variant="dialog"
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          <Field
            label="Name"
            name="contact"
            type="select"
            values={contacts.map((c) => c.id)}
            labels={contacts.map((c) => c.full_name)}
            onChange={handleContactSelect}
          />
        </Form>
        <Box>
          <Text>Assigned contacts</Text>
          {selectedContactIds.map((contactId) => {
            const contact = contacts.find((c) => c.id === contactId);
            return (
              <Flex key={contactId} align="center" gap="2">
                <Text>{contact?.full_name}</Text>
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => handleContactRemove(contactId)}
                >
                  Remove
                </Button>
              </Flex>
            );
          })}
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
