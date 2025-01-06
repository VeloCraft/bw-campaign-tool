import { useFormContext } from 'react-hook-form';
import {
  Flex,
  type BoxProps,
  Box,
  Text,
  CheckboxGroup,
} from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';

type ComponentProps = BoxProps & {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string[];
  values?: string[];
  labels: React.ReactNode[];
  placeholder?: string;
};

const Component = ({
  name,
  label,
  required,
  disabled,
  defaultValue,
  values,
  labels,
  ...boxProps
}: ComponentProps) => {
  const { register } = useFormContext();
  return (
    <Box asChild {...boxProps}>
      <Flex mb="4" direction="column" asChild minWidth="200px">
        <Form.Field name={name}>
          <Form.Label asChild>
            <Text as="p" size="2" color="gray" mb="2">
              {label}
            </Text>
          </Form.Label>
          <Form.Control required={required} asChild>
            <CheckboxGroup.Root
              defaultValue={defaultValue}
              disabled={disabled}
              size="3"
              {...register(name, { required })}
            >
              {values.map((value: string, i: number) => (
                <CheckboxGroup.Item key={value} value={value}>
                  {labels[i]}
                </CheckboxGroup.Item>
              ))}
            </CheckboxGroup.Root>
          </Form.Control>
        </Form.Field>
      </Flex>
    </Box>
  );
};

export default Component;
