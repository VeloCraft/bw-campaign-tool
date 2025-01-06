
'use client';

import List from '@/components/Actions/List';
import SignInWrapper from '@/components/SignInWrapper';

export default function ActionsPage() {
  //const { data, loading } = useFirestoreCollection<Action>('actions', true);

  //if (loading) { return null }

  //console.log('Page', data)

  return (
    <SignInWrapper force >
    <List />
    </SignInWrapper>
  );
}
