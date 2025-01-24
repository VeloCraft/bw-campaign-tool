import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';

type ComponentProps = ButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Partial<DocumentDoc>;
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
  ...props
}: ComponentProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button {...props} />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Form
          variant="dialog"
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          <Field label="File" name="file" type="media" required />
          <Field label="Name" name="name" type="text" required />
          <Field
            label="Key details"
            name="description"
            type="textarea"
            required
          />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
