import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';

type ComponentProps = ButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Partial<MediaRecord>;
  onSubmit: (values: FormSubmission) => Promise<void>;
  title: string;
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
          <Field label="Name" name="full_name" type="text" required />
          <Field label="E-mail" name="email" type="text" />
          <Field label="Phone" name="phone" type="text" />
          <Field label="Organisation" name="organisation" type="text" />
          <Field label="Role/job title" name="role" type="text" />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;