import { getApps, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { type DocumentData } from 'firebase/firestore';

const apps = getApps();
if (!apps.length) {
  initializeApp({
    credential: cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}

export const db = getFirestore();

type ParseDoc = <T>(id: string, data: DocumentData) => T & { id: string };

const convertDates = (obj?: any) => {
  if (!obj) return obj;
  if (typeof obj === 'object') {
    if (obj?.toMillis) return obj.toMillis();
    if (obj.length) return obj.map((item: any) => convertDates(item));
    Object.keys(obj).forEach((key) => {
      obj[key] = convertDates(obj[key]);
    });
  }
  return obj;
};

export const parseDoc: ParseDoc = <T>(id: string, data: DocumentData) => {
  const doc = { id, ...convertDates(data) } as T & { id: string };
  return doc;
};

type GetDoc = <T>(path: string) => Promise<(T & { id: string }) | null>;

export const getDoc: GetDoc = async <T>(path: string) => {
  const doc = await db.doc(path).get();
  if (doc.exists) return parseDoc<T>(doc.id, doc.data());
  return null;
};

type GetCollection = <T>(
  collection: string | null,
  opts?: Record<string, (string | number)[]>,
) => Promise<(T & { id: string })[]>;

export const getCollection: GetCollection = async <T>(
  collection: string | null,
  opts?: Record<string, (string | number)[]>,
) => {
  const query = db.collection(collection);
  if (opts) {
    Object.entries(opts).forEach(([key, value]) => {
      query.where(key, 'in', value);
    });
  }
  const snapshot = await query.get();
  if (snapshot.empty) return [];
  return snapshot.docs.map((doc) => parseDoc<T>(doc.id, doc.data()));
};
