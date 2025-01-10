import Select from '@/components/Form/Select';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';

type ComponentProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  //values?: string[];
  //labels: React.ReactNode[];
  placeholder?: string;
};

const Component = (props: ComponentProps) => {
  const { data: users, loading } = useFirestoreCollection<User>('users');

  if (loading) {
    return <Select values={['none']} labels={['None']} {...props} />;
  }

  return (
    <Select
      values={users?.map((user) => user.id)}
      labels={users?.map((user) => user.displayName || user.email) 
      }
      {...props}
    />
  );
};

export default Component;
