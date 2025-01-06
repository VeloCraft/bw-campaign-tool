import React from 'react';
import * as Form from '@radix-ui/react-form';
import { Box, Popover, Dialog, Callout, Flex } from '@radix-ui/themes';
import FieldComponent from '@/components/Form/Field';
import { ExclamationTriangleIcon as ErrorIcon } from '@radix-ui/react-icons';
import SubmitComponent from '@/components/Form/Submit';
import CancelComponent from '@/components/Form/Cancel';
import DeleteComponent from '@/components/Form/Delete';
import { FormProvider, useForm, type UseFormRegister } from 'react-hook-form';

export const Field = FieldComponent;
export const Submit = SubmitComponent;
export const Cancel = CancelComponent;
export const Delete = DeleteComponent;

type ComponentProps = {
  id?: string;
  onSubmit: (data: FormSubmission) => Promise<void>;
  children?: React.ReactNode;
  variant?: 'dialog' | 'popover';
  submitLabel?: string;
  cancelLabel?: string;
  initialValues?: FormValues;
  onDelete?: () => Promise<void>;
  deleteLabel?: string;
  deleteTitle?: string;
  deleteMessage?: string;
  noCancel?: boolean;
  onCancel?: () => void;
  disabled?: boolean;
  render?: (register: UseFormRegister<any>) => React.ReactNode;
  noSubmit?: boolean;
  enterToSubmit?: boolean;
};

const Component = ({
  id,
  variant,
  onSubmit: submit,
  children: _children,
  submitLabel,
  cancelLabel,
  initialValues = {},
  onDelete,
  deleteLabel,
  deleteTitle,
  deleteMessage,
  noCancel,
  onCancel,
  disabled,
  render,
  noSubmit,
  enterToSubmit = true,
}: ComponentProps) => {
  const defaultValues = React.useMemo(() => initialValues, []); // eslint-disable-line
  const methods = useForm({ defaultValues });
  const { handleSubmit, register } = methods;
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setError(null);
    setSubmitting(true);
    try {
      await submit({ ...initialValues, ...data });
    } catch (error) {
      setError((error as Error)?.message);
    }
    setSubmitting(false);
  };

  const children = render ? render(register) : _children;
  const submitType = enterToSubmit ? 'submit' : 'button';

  return (
    <FormProvider {...methods}>
      <Form.Root
        style={variant === 'dialog' ? { marginTop: 16 } : {}}
        id={id}
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
        {error && (
          <Callout.Root color="red" mt="4">
            <Callout.Icon>
              <ErrorIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Flex gap="3" mt="4" justify="end">
          {onDelete && (
            <Box flexGrow="1" asChild>
              <Box>
                <Delete
                  disabled={disabled || submitting}
                  message={deleteMessage}
                  title={deleteTitle}
                  label={deleteLabel}
                  onDelete={onDelete}
                />
              </Box>
            </Box>
          )}
          {variant === 'dialog' ? (
            <>
              {onCancel ? (
                <Cancel
                  onClick={onCancel}
                  label={cancelLabel}
                  disabled={disabled || submitting}
                />
              ) : (
                <Dialog.Close>
                  <Cancel
                    label={cancelLabel}
                    disabled={disabled || submitting}
                  />
                </Dialog.Close>
              )}
              <Submit
                type={submitType}
                label={submitLabel}
                submitting={disabled || submitting}
              />
            </>
          ) : variant === 'popover' ? (
            <>
              <Popover.Close>
                <Cancel label={cancelLabel} disabled={disabled || submitting} />
              </Popover.Close>
              <Submit
                type={submitType}
                label={submitLabel}
                submitting={disabled || submitting}
              />
            </>
          ) : (
            <>
              {!noCancel && (
                <Cancel
                  disabled={disabled || submitting}
                  onClick={onCancel}
                  label={cancelLabel}
                />
              )}
              {!noSubmit && (
                <Submit
                  type={submitType}
                  label={submitLabel}
                  submitting={disabled || submitting}
                />
              )}
            </>
          )}
        </Flex>
      </Form.Root>
    </FormProvider>
  );
};

export default Component;
