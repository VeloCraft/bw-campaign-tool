'use client';
import EditGoalForm from '@/components/goals/edit-goal-form';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import { useParams } from 'next/navigation';

const Component = () => {
  const { id } = useParams();

  // Fetch goal data
  const { data: goal } = useFirestoreDoc<Goal>(`goals/${id}`, true);
  const { data: campaigns } = useFirestoreCollection<Campaign>('campaigns');

  if (!goal || !campaigns) {
    return <div>Loading...</div>;
  }

  return <EditGoalForm goal={goal} campaigns={campaigns} />;
};

export default Component;
