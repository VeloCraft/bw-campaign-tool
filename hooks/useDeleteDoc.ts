import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import useStatusUpdate from '@/hooks/useStatusUpdate';

const types = {
  users: 'user',
  broadcasts: 'broadcast',
  listeners: 'listener',
};

const useDeleteDoc = (
  docId: string,
  message?: boolean | string,
): [() => Promise<void>, boolean] => {
  const [saving, setSaving] = React.useState(false);
  const docType = types[docId.split('/')[0] as keyof typeof types];
  const onAddMessage = useStatusUpdate();

  const onDelete = async () => {
    setSaving(true);
    try {
      await deleteDoc(doc(db, docId));
      if (message && docType) {
        onAddMessage({
          message:
            typeof message === 'string'
              ? message
              : `${docType.substring(0, 1).toUpperCase()}${docType.substring(1)} deleted`,
          variant: 'success',
        });
      }
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

  return [onDelete, saving];
};

export default useDeleteDoc;
