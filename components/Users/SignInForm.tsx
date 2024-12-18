import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';
type ComponentProps = ButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Record<string, string>;
  onSubmit: (values: FormSubmission) => Promise<void>;
};

const Component = ({
  open,
  setOpen,
  initialValues = {},
  onSubmit,
  ...props
}: ComponentProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button {...props} variant="outline" />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Sign In</Dialog.Title>
        <Form
          variant="dialog"
          onSubmit={onSubmit}
          initialValues={initialValues}
          submitLabel="Sign In"
        >
          <Field
            label="E-mail"
            name="email"
            type="email"
            required
          />
          <Field
            label="Password"
            name="password"
            type="password"
            required
          />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
