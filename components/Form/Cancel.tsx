import { Button, type ButtonProps } from '@radix-ui/themes';

type SubmitProps = ButtonProps & {
  label?: string;
};

const Cancel = ({ label = 'Cancel', ...buttonProps }: SubmitProps) => (
  <Button type="button" variant="soft" color="gray" {...buttonProps}>
    {label}
  </Button>
);

export default Cancel;
