import { db } from '@/helpers/firebaseAdmin';
import type { DocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';

export const onLoadData = async () => {
  let result: [DocumentSnapshot, QuerySnapshot] | null = null;
  try {
    result = await Promise.all([
      db.doc('floods/root').get(),
      db.collection('stations').get(),
    ]);
  } catch (error) {
    console.error(error);
  }
  if (!result) return null;
  const [rootRoutesData, stationsData] = result;
  const rootRoutes = rootRoutesData.data() as RootRoutes;
  const stations = stationsData.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }) as Station)
    .map((station) => ({
      ...station,
      updatedAt: station.updatedAt._seconds * 1000,
    }));
  return { rootRoutes, stations };
};
