import Contacts from '@/components/Contacts/Page';
import getUser from '@/helpers/auth';
import { getCollection } from '@/helpers/firebaseAdmin';

const Component = async () => {
  const user = await getUser();
  const contacts = await getCollection<Contact>('contacts');
  return <Contacts user={user} contacts={contacts} />;
};

export default Component;
