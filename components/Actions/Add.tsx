import React from 'react';
import Form from '@/components/Actions/Form';
import { db } from '@/helpers/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { type ButtonProps } from '@radix-ui/themes';
import useStatusUpdate from '@/hooks/useStatusUpdate';
import UserContext from '@/contexts/User';

type AddProps = ButtonProps & {
  campaign: Campaign;
};

const Add = ({ campaign, ...props }: AddProps) => {
  const user = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const onSubmit = async (values: Partial<Action>) => {
    const newValues = {
      ...values,
      createdAt: new Date(),
      userId: user.id,
      campaignId: campaign.id,
    } satisfies Omit<Action, 'id'>;
    await addDoc(collection(db, 'actions'), newValues);
    onAddMessage({ message: 'Action added', variant: 'success' });
    setOpen(false);
  };

  const initialValues = {
    action: null,
    dateSet: new Date(),
    status: 'pending',
    assigneeId: null,
  };

  const onClose = () => setOpen(false);

  return (
    <Form
      data-testid="add-action-button"
      initialValues={initialValues}
      campaignId={campaign.id}
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit as any}
      title={`Add an action to ${campaign.name}`}
      description="Enter the details of the action"
      onCancel={onClose}
      {...props}
    />
  );
};

export default Add;
