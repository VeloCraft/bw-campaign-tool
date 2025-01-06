import { useFormContext } from 'react-hook-form';
import { Select, Flex, type BoxProps, Box, Text } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';

export type ComponentProps = BoxProps & {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
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
  placeholder,
  ...boxProps
}: ComponentProps) => {
  const { register } = useFormContext();
  const {
    onChange: onChangeSelect,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: selectRef,
    ...selectProps
  } = register(name, { required });
  const onValueChange = (_value: string) => {
    let value = _value;
    if (value === ' ') value = '';
    onChangeSelect({ target: { name, value } });
  };
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
            <Select.Root
              value={defaultValue}
              disabled={disabled}
              size="3"
              {...selectProps}
              onValueChange={onValueChange}
            >
              <Select.Trigger placeholder={placeholder} />
              <Select.Content>
                {placeholder && (
                  <>
                    <Select.Item value=" ">{placeholder}</Select.Item>
                    <Select.Separator />
                  </>
                )}
                {values.map((value: string, i: number) => (
                  <Select.Item key={value} value={value}>
                    {labels[i]}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Form.Control>
        </Form.Field>
      </Flex>
    </Box>
  );
};

export default Component;
