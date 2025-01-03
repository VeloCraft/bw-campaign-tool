import { TextField, type BoxProps, Box, Text } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { useFormContext } from 'react-hook-form';

type ComponentProps = BoxProps & {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'number' | 'text' | 'email' | 'password';
};

const Component = ({
  name,
  label,
  placeholder,
  defaultValue,
  disabled,
  required,
  type,
  ...boxProps
}: ComponentProps) => {
  const { register } = useFormContext();
  const textFieldProps = register(name, {
    required,
    valueAsNumber: type === 'number',
  });
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
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue as string}
            size="3"
            mb="4"
            {...textFieldProps}
          />
        </Form.Control>
      </Form.Field>
    </Box>
  );
};

export default Component;
