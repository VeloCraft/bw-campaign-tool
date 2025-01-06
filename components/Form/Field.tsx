import { type BoxProps } from '@radix-ui/themes';
import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import Slider from '@/components/Form/Slider';
import Select from '@/components/Form/Select';
import DateField from '@/components/Form/Date';
import TextArea from '@/components/Form/TextArea';
import DefaultField from '@/components/Form/Default';
import Media from '@/components/Form/Media';
import CheckboxGroup from '@/components/Form/CheckboxGroup';

type ComponentProps = BoxProps & {
  name: string;
  type?:
    | 'select'
    | 'slider'
    | 'checkboxGroup'
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'textarea'
    | 'date'
    | 'media';
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
  tags?: string[];
  resourceType?: 'image' | 'raw';
};

const Component = ({ name, type, ...props }: ComponentProps) => {
  const { getValues } = useFormContext();
  const { defaultValues } = useFormState();
  const defaultValue = getValues(name) || defaultValues[name];
  switch (type) {
    case 'slider':
      return <Slider name={name} defaultValue={defaultValue} {...props} />;
    case 'select':
      if (!props.values || !props.labels)
        return <>Select fields must have values and labels</>;
      return (
        <Select
          name={name}
          defaultValue={defaultValue}
          {...props}
          values={props.values}
          labels={props.labels}
        />
      );
    case 'checkboxGroup':
      if (!props.values || !props.labels)
        return <>CheckboxGroup fields must have values and labels</>;
      return (
        <CheckboxGroup
          name={name}
          defaultValue={defaultValue}
          {...props}
          values={props.values}
          labels={props.labels}
        />
      );
    case 'date':
      return <DateField name={name} defaultValue={defaultValue} {...props} />;
    case 'textarea':
      return <TextArea name={name} defaultValue={defaultValue} {...props} />;
    case 'media':
      return <Media name={name} defaultValue={defaultValue} {...props} />;
    default:
      return (
        <DefaultField name={name} defaultValue={defaultValue} {...props} />
      );
  }
};

export default Component;
