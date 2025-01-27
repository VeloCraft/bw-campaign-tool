import React from 'react';
import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';
import { useState } from 'react';
import useUpdateDoc from '@/hooks/useUpdateDoc';

type ComponentProps = ButtonProps & {
  initialValues?: { contactIds: string[] };
  campaignId: string;
  contacts?: Contact[];
};

const Component = ({
  initialValues = { contactIds: [] },
  campaignId,
  contacts,
  ...props
}: ComponentProps) => {
  const [onUpdate] = useUpdateDoc(`campaigns/${campaignId}`, true);
  const [open, setOpen] = useState(false);

  const onSubmit = async ({ contactIds }: FormSubmission) => {
    await onUpdate({ contactIds });
    setOpen(false);
  };

  const [values, labels] = React.useMemo(() => {
    if (!contacts) return [[], []];
    return [contacts.map((c) => c.id), contacts.map((c) => c.fullName)];
  }, [contacts]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button mt="2" {...props} />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Assign contacts to campaign</Dialog.Title>
        <Dialog.Description>
          List of useful contacts for this campaign
        </Dialog.Description>
        <Form
          variant="dialog"
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          <Field
            label="Contacts"
            name="contactIds"
            type="select"
            values={values}
            labels={labels}
            multiple
          />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
