import React from 'react';
import { db, convertDates } from '@/helpers/firebase';
import {
  query,
  collection,
  onSnapshot,
  getDocs,
  type QuerySnapshot,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { useEffectOnceWhen } from 'rooks';

type UseFirestoreCollection = {
  <T>(
    collection: string | null,
    subscribe?: boolean,
    ...opts: QueryConstraint[]
  ): {
    data: (T & { id: string })[];
    loading: boolean;
    ref: ReturnType<typeof query> | null;
  };
};

const useFirestoreCollection: UseFirestoreCollection = <T>(
  coll: string | null,
  subscribe?: boolean,
  ...opts: QueryConstraint[]
) => {
  const [data, setData] = React.useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = React.useState(true);
  const queryRef = React.useMemo(
    () => (coll ? query(collection(db, coll), ...opts) : null),
    [coll, opts],
  );

  useEffectOnceWhen(() => {
    if (!queryRef) return;
    if (subscribe) {
      const unsubscribe = onSnapshot(queryRef, (snap: QuerySnapshot) => {
        const data = snap.docs.map((doc: QueryDocumentSnapshot) => ({
          ...(convertDates(doc.data()) as T),
          id: doc.id,
        }));
        setData(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
    getDocs(queryRef).then((snap: QuerySnapshot) => {
      const data = snap.docs.map((doc: QueryDocumentSnapshot) => ({
        ...(convertDates(doc.data()) as T),
        id: doc.id,
      }));
      setData(data);
      setLoading(false);
    });
  }, !!queryRef);

  return { data, loading, ref: queryRef };
};

export default useFirestoreCollection;
