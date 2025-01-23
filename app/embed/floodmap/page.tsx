import React from 'react';
import { onLoadData } from '@/helpers/floodmap';
import Wrapper from '@/components/Floods/Wrapper';

export default async function ListenerPage() {
  const { rootRoutes, stations } = await onLoadData();
  return (
    <React.Suspense>
      <Wrapper variant="embed" rootRoutes={rootRoutes} stations={stations} />
    </React.Suspense>
  );
}
