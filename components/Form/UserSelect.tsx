import Select, { ComponentProps } from '@/components/Form/Select';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';

const Component = (props: ComponentProps) => {
  const { data: users, loading } = useFirestoreCollection<User>('users');

  if (loading) {
    return <Select values={['none']} labels={['None']} {...props} />;
  }

  return (
    <Select
      values={[...users?.map((user) => user.id), 'none']}
      labels={[...users?.map((user) => user.displayName || user.email), 'None']}
      {...props}
    />
  );
};

export default Component;
