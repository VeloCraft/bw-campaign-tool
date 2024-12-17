'use client';
import UserTable from '@/components/admin/user-table';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

const Component = () => {
  const { data: app, loading } = useFirestoreDoc<App>('app/root', true);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin</h1>
      <UserTable users={app?.users || []} />
    </div>
  );
};

export default Component;
