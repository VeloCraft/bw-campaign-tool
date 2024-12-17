'use client';
import EditCampaignForm from '@/components/edit-campaign';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import { useParams } from 'next/navigation';

const Component = () => {
  const { id } = useParams();

  const { data, loading } = useFirestoreDoc<Campaign>(`campaigns/${id}`, true);

  if (loading) return <div>Loading...</div>;

  return <EditCampaignForm campaign={data} />;
};

export default Component;
