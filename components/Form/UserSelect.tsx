import Select from '@/components/Form/Select';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';

type ComponentProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  other?: boolean;
  //values?: string[];
  //labels: React.ReactNode[];
  placeholder?: string;
};

const Component = (props: ComponentProps) => {
  const { data: users, loading } = useFirestoreCollection<User>('users');

  if (loading) {
    return <Select values={['none']} labels={['None']} {...props} />;
  }

  const values_default: string[] = props.other ? ['none', 'other'] : ['none'];
  const labels_default: string[] = props.other
    ? ['None', 'Other - please specify']
    : ['None'];

  return (
    <Select
      values={[...users?.map((user) => user.id), ...values_default]}
      labels={[
        ...users?.map((user) => user.displayName || user.email),
        ...labels_default,
      ]}
      {...props}
    />
  );
};

export default Component;
