import {
  Select,
  TextField,
  Flex,
  type BoxProps,
  Box,
  Text,
  Slider,
  TextArea,
} from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

type ComponentProps = BoxProps & {
  name: string;
  type?:
    | 'select'
    | 'slider'
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'textarea'
    | 'date';
  label: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  values?: string[];
  labels?: React.ReactNode[];
  direction?: 'row' | 'column';
  min?: number;
  max?: number;
  step?: number;
};

const Component = ({
  name,
  type = 'text',
  label,
  placeholder,
  disabled,
  required,
  values,
  labels,
  min,
  max,
  step,
  ...boxProps
}: ComponentProps) => {
  const { register, getValues } = useFormContext();
  const { defaultValues } = useFormState();
  const defaultValue = getValues(name) || defaultValues[name];
  let onValueChange: (value: string | number[]) => void;

  switch (type) {
    case 'slider':
      const {
        onChange: onChangeSlider,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ref: sliderRef,
        ...sliderProps
      } = register(name, { required, min, max });
      onValueChange = (value: number[]) => {
        onChangeSlider({ target: { name, value: value[0] } });
      };
      return (
        <Box asChild {...boxProps}>
          <Flex direction="column" asChild>
            <Form.Field name={name}>
              <Form.Label asChild>
                <Text as="p" size="2" color="gray" mb="2">
                  {label}
                </Text>
              </Form.Label>
              <Form.Control required={required} asChild>
                <Slider
                  disabled={disabled}
                  defaultValue={[defaultValue] as number[]}
                  size="3"
                  mb="4"
                  {...sliderProps}
                  min={min}
                  max={max}
                  step={step}
                  onValueChange={onValueChange}
                />
              </Form.Control>
            </Form.Field>
          </Flex>
        </Box>
      );
    case 'select':
      const {
        onChange: onChangeSelect,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ref: selectRef,
        ...selectProps
      } = register(name, { required });
      onValueChange = (_value: string) => {
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
                  defaultValue={defaultValue}
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
    case 'date':
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
                placeholder={placeholder}
                disabled={disabled}
                defaultValue={defaultValue as string}
                size="3"
                mb="4"
                {...register(name, { required })}
              />
            </Form.Control>
          </Form.Field>
        </Box>
      );
    case 'textarea':
      return (
        <Box asChild {...boxProps}>
          <Form.Field name={name}>
            <Form.Label asChild>
              <Text as="p" size="2" mb="2" color="gray">
                {label}
              </Text>
            </Form.Label>
            <Form.Control required={required} asChild>
              <TextArea
                placeholder={placeholder}
                disabled={disabled}
                defaultValue={defaultValue as string}
                size="3"
                mb="4"
                {...register(name, {
                  required,
                })}
              />
            </Form.Control>
          </Form.Field>
        </Box>
      );
    default:
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
                {...register(name, {
                  required,
                  valueAsNumber: type === 'number',
                })}
              />
            </Form.Control>
          </Form.Field>
        </Box>
      );
  }
};

export default Component;
