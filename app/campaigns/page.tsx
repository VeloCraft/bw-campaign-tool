import getUser from '@/helpers/auth';
import { getCollection } from '@/helpers/firebaseAdmin';
import Campaigns from '@/components/Campaigns';

export default async function CampaignsPage() {
  const user = await getUser();
  const campaigns = await getCollection<Campaign>('campaigns');
  return <Campaigns campaigns={campaigns} user={user} />;
}
