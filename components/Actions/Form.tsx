
import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';

type ComponentProps = ButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Record<string, string>;
  onSubmit: (values: FormSubmission) => Promise<void>;
  title: string;
  description: string;
};

const Component = ({
  open,
  setOpen,
  initialValues = {},
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
            name="action"
            type="textarea"
            required
          />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
