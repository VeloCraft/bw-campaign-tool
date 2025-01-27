import { getCollection, getDoc } from '@/helpers/firebaseAdmin';

export const onLoadData = async () => {
  const rootRoutes = await getDoc<RootRoutes>('floods/root');
  const stations = await getCollection<Station>('stations');
  return { rootRoutes, stations };
};
