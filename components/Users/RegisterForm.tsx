
import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';


type ComponentProps = ButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;

  onSubmit: (values: FormSubmission) => Promise<void>;
};


const Component = ({
  open,
  setOpen,
  onSubmit,
  ...props
}: ComponentProps) => {

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button {...props} variant="outline" />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Register</Dialog.Title>
        <Form
          variant="dialog"
          onSubmit={onSubmit}
          submitLabel="Register"
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
