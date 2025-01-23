import React from 'react';
import { onLoadData } from '@/helpers/floodmap';
import Wrapper from '@/components/Floods/Wrapper';

export default async function Page() {
  const { rootRoutes, stations } = await onLoadData();
  return (
    <React.Suspense>
      <Wrapper variant="default" rootRoutes={rootRoutes} stations={stations} />
    </React.Suspense>
  );
}
