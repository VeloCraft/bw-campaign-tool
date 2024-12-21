
'use client';

import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import List from '@/components/Actions/List';
import SignInWrapper from '@/components/SignInWrapper';

export default function ActionsPage() {
  const { data, loading } = useFirestoreCollection<Action>('actions', true);

  if (loading) { return null }

  console.log('Page', data)

  return (
    <SignInWrapper force loading={loading}>
    <List actions={data} loading={loading} />
    </SignInWrapper>
  );
}
