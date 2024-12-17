import * as Form from '@radix-ui/react-form';
import { Button, type ButtonProps } from '@radix-ui/themes';

type SubmitProps = ButtonProps & {
  submitting?: boolean;
  label?: string;
};

const Submit = ({
  submitting,
  label = 'Save',
  ...buttonProps
}: SubmitProps) => (
  <Form.Submit asChild>
    <Button loading={submitting} disabled={submitting} {...buttonProps}>
      {label}
    </Button>
  </Form.Submit>
);

export default Submit;
