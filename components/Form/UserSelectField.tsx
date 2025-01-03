import Field, { ComponentProps } from '@/components/Form/Field';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';

const Component = (props: ComponentProps) => {
  const { data: users, loading } = useFirestoreCollection<User>('users');

  if (loading) {
    users = [];
  }

  return (
    <Field
      type="select"
      values={[...users?.map((user) => user.id), 'none']}
      labels={[...users?.map((user) => user.displayName || user.email), 'None']}
      {...props}
    />
  );
};

export default Component;
