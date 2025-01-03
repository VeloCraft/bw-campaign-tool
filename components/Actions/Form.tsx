import { Dialog, Button, type ButtonProps } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';
import MediaField from '@/components/Actions/MediaField';
import { CloudinaryUploadWidgetInfo } from '@cloudinary-util/types';

type ComponentProps = ButtonProps & {
  campaign?: CampaignDetails;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCancel?: () => void;
  initialValues?: Record<string, string>;
  onSubmit: (values: FormSubmission) => Promise<void>;
  title: string;
  description: string;
  resource?: CloudinaryUploadWidgetInfo;
  setResource?: (resource: CloudinaryUploadWidgetInfo) => void;
};

const Component = ({
  campaign,
  resource,
  setResource,
  open,
  setOpen,
  initialValues = {},
  onSubmit,
  title,
  description,
  ...props
}: ComponentProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button {...props} />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Form
          variant="dialog"
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          <Field
            label="Record your action"
            name="action"
            type="textarea"
            required
          />
          <Field label="Date" name="dateSet" type="date" required />
          <Field
            label="Status"
            name="status"
            type="select"
            values={['pending', 'in progress', 'completed']}
            labels={['Pending', 'In progress', 'Completed']}
            required
          />
          <Field type="userSelect" label="Assignee" name="assigneeId" />
          <MediaField
            setResource={setResource}
            resource={resource}
            options={{ tags: [campaign?.id] }}
          />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Component;
