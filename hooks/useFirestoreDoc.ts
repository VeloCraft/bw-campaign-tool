import React from 'react';
import { db, convertDates } from '@/helpers/firebase';
import {
  doc,
  onSnapshot,
  getDoc,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { useEffectOnceWhen } from 'rooks';

type UseFirestoreDoc = <T>(
  docId: string | null,
  subscribe?: boolean,
  onSuccess?: (data: T & { id: string }) => void,
) => {
  data: (T & { id: string }) | null;
  loading: boolean;
  ref: ReturnType<typeof doc> | undefined;
  onSuccess?: (data: T & { id: string }) => void;
};

const useFirestoreDoc: UseFirestoreDoc = <T>(
  docId: string | null,
  subscribe?: boolean,
  onSuccess?: (data: T & { id: string }) => void,
) => {
  const [data, setData] = React.useState<
    | (T & {
        id: string;
      })
    | null
  >(null);
  const [loading, setLoading] = React.useState(true);
  const docRef = React.useMemo(
    () => (docId ? doc(db, docId) : undefined),
    [docId],
  );

  useEffectOnceWhen(() => {
    if (docRef) {
      if (subscribe) {
        const unsubscribe = onSnapshot(docRef, (doc: DocumentSnapshot) => {
          const data = convertDates(doc.data()) as T;
          const document = { ...data, id: doc.id };
          setData(document);
          setLoading(false);
          onSuccess?.(document);
        });
        return () => unsubscribe();
      }
      getDoc(docRef).then((doc: DocumentSnapshot) => {
        const data = convertDates(doc.data()) as T;
        const document = { ...data, id: doc.id };
        setData(document);
        setLoading(false);
        onSuccess?.(document);
      });
    }
  }, !!docRef);

  return { data, loading, ref: docRef, onSuccess };
};

export default useFirestoreDoc;
