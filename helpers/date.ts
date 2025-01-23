import { type Timestamp } from 'firebase/firestore';

export const toISOString = (date: Date | Timestamp | null) => {
  if (!date) return '';
  if ((date as Timestamp).toDate)
    return (date as Timestamp).toDate().toISOString();
  return (date as Date).toISOString();
};
