import Page from '@/components/Campaigns/Page';
import getUser from '@/helpers/auth';
import { getDoc } from '@/helpers/firebaseAdmin';

const Component = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const user = await getUser();
  const campaign = await getDoc<Campaign>(`campaigns/${id}`);
  return <Page user={user} campaign={campaign} />;
};

export default Component;
