import { TextField, type BoxProps, Box, Text } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { useFormContext } from 'react-hook-form';

type ComponentProps = BoxProps & {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: Date;
};

const Component = ({
  name,
  label,
  required,
  disabled,
  defaultValue: value,
  ...boxProps
}: ComponentProps) => {
  const { register } = useFormContext();
  const defaultValue = value ? (value as Date).toISOString().split('T')[0] : '';
  const { ref, ...props } = register(name, { required, valueAsDate: true }); // eslint-disable-line @typescript-eslint/no-unused-vars
  return (
    <Box asChild {...boxProps}>
      <Form.Field name={name}>
        <Form.Label asChild>
          <Text as="p" size="2" mb="2" color="gray">
            {label}
          </Text>
        </Form.Label>
        <Form.Control required={required} asChild>
          <TextField.Root
            type="date"
            disabled={disabled}
            defaultValue={defaultValue}
            size="3"
            mb="4"
            {...props}
          />
        </Form.Control>
      </Form.Field>
    </Box>
  );
};

export default Component;
