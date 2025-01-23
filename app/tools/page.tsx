import Tools from '@/components/Tools';
import getUser from '@/helpers/auth';

const Component = async () => {
  const user = await getUser();
  return <Tools user={user} />;
};

export default Component;
