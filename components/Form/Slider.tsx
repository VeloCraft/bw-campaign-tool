import * as Form from '@radix-ui/react-form';
import { Flex, type BoxProps, Box, Text, Slider } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';

type ComponentProps = BoxProps & {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
};

const Component = ({
  name,
  label,
  required,
  disabled,
  defaultValue,
  min,
  max,
  step,
  ...boxProps
}: ComponentProps) => {
  const { register } = useFormContext();
  const {
    onChange: onChangeSlider,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: sliderRef,
    ...sliderProps
  } = register(name, { required, min, max });
  const onValueChange = (value: number[]) => {
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
};

export default Component;
