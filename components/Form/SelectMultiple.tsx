import React from 'react';
import {
  DropdownMenu,
  Flex,
  type BoxProps,
  Box,
  Text,
  TextField,
} from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { useForm } from 'react-hook-form';

type SelectMultipleProps = BoxProps & {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string[];
  values?: string[];
  labels: React.ReactNode[];
  placeholder?: string;
  empty?: string;
  multiple?: boolean;
};

const SelectMultiple = ({
  name,
  label,
  required,
  disabled,
  defaultValue = [],
  values,
  labels,
  placeholder,
  empty,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multiple,
  ...boxProps
}: SelectMultipleProps) => {
  const { setValue } = useForm();
  const [items, setItems] = React.useState<string[]>(defaultValue);

  const onClick = (v: string) => (ev: React.MouseEvent) => {
    ev.preventDefault();
    const newValue =
      v === ' '
        ? []
        : items.includes(v)
          ? items.filter((i) => i !== v)
          : [...items, v];
    setValue(name, newValue);
    setItems(newValue);
  };

  const textFieldValue =
    items.map((item) => labels[values.indexOf(item)] || item).join(', ') ||
    empty ||
    placeholder ||
    ' ';

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
            <DropdownMenu.Root>
              <DropdownMenu.Trigger disabled={disabled}>
                <TextField.Root
                  size="3"
                  mb="4"
                  disabled={disabled}
                  value={textFieldValue}
                  variant="soft"
                  data-testid="select-multiple"
                >
                  <TextField.Slot side="right">
                    <DropdownMenu.TriggerIcon area-disabled={disabled} />
                  </TextField.Slot>
                </TextField.Root>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.CheckboxItem
                  onClick={empty ? onClick(' ') : undefined}
                  checked={empty && !items.length}
                  disabled={empty ? disabled : true}
                >
                  {empty || placeholder}
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.Separator />
                {values.map((v: string, i: number) => (
                  <DropdownMenu.CheckboxItem
                    key={v}
                    onClick={onClick(v)}
                    checked={items.includes(v)}
                  >
                    {labels[i]}
                  </DropdownMenu.CheckboxItem>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Form.Control>
        </Form.Field>
      </Flex>
    </Box>
  );
};

export default SelectMultiple;
