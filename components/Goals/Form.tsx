import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';

type ComponentProps = ButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues?: Record<string, string | Date>;
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
          <Field mt="4" label="Name" name="name" required />
          <Field
            label="Description"
            name="description"
            type="textarea"
            required
          />
          <Field
            label="Status"
            name="status"
            type="select"
            required
            values={['active', 'complete']}
            labels={['Active', 'Complete']}
          />
          {/*<Field name="target_date" label="Target date" type="dateselector" />*/}
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
