import React from 'react';
import { onAuthStateChanged, type User as AuthUser } from 'firebase/auth';
import { auth } from '@/helpers/firebase';
import { useEffectOnceWhen } from 'rooks';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

const useUser = (subscribe: boolean): [User | null, boolean] => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const { data, loading } = useFirestoreDoc<User>(
    user?.uid ? `users/${user.uid}` : null,
    subscribe,
  );

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: AuthUser | null) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffectOnceWhen(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: AuthUser | null) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, !!auth);

  return [data, !!(user?.uid && loading)];
};

export default useUser;
