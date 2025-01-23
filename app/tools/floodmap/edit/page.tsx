import React from 'react';
import Wrapper from '@/components/Floods/Wrapper';
import { onLoadData } from '@/helpers/floodmap';

export default async function Page() {
  const { rootRoutes, stations } = await onLoadData();
  return (
    <React.Suspense>
      <Wrapper variant="edit" rootRoutes={rootRoutes} stations={stations} />
    </React.Suspense>
  );
}
