import React from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import useStatusUpdate from '@/hooks/useStatusUpdate';

const types = {
  users: 'user',
  broadcasts: 'broadcast',
  listeners: 'listener',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataObj = { [key: string]: any };

const useUpdateDoc = (
  docId: string,
  message?: boolean | string,
): [(data: DataObj) => Promise<void>, boolean] => {
  const [saving, setSaving] = React.useState(false);
  const docType = types[docId.split('/')[0] as keyof typeof types];
  const onAddMessage = useStatusUpdate();

  const onUpdate = async (data: DataObj) => {
    setSaving(true);
    try {
      await updateDoc(doc(db, docId), data);
      if (message && docType) {
        onAddMessage({
          message:
            typeof message === 'string'
              ? message
              : `${docType.substring(0, 1).toUpperCase()}${docType.substring(1)} updated`,
          variant: 'success',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error updating document:', error);
      if (message && docType) {
        onAddMessage({
          message: `Error updating ${docType}: ${error.message}`,
          variant: 'error',
        });
      }
    }
    setSaving(false);
  };

  return [onUpdate, saving];
};

export default useUpdateDoc;
