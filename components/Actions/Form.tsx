import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';

type ComponentProps = ButtonProps & {
  campaignId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCancel?: () => void;
  initialValues?: Omit<Action, 'id'>;
  onSubmit: (values: FormSubmission) => Promise<void>;
  title: string;
  description: string;
};

const Component = ({
  campaignId,
  open,
  setOpen,
  initialValues,
  onSubmit,
  title,
  description,
  ...props
}: ComponentProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button {...props} />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Form
          variant="dialog"
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          <Field
            label="Record your action"
            name="action"
            type="textarea"
            required
          />
          <Field label="Date" name="dateSet" type="date" required />
          <Field
            label="Upload media"
            name="media"
            type="media"
            resourceType="image"
            tags={[campaignId]}
          />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
