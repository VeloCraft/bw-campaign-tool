import React from 'react';
import { useLocalstorageState } from 'rooks';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';
import { toISOString } from '@/helpers/date';

const useRootRoute = (editable: boolean): Route[] => {
  const [localReports, setLocalReports] = useLocalstorageState<LocalReports>(
    'reports',
    {},
  );
  const { data: allRoutes } = useFirestoreDoc<RootRoutes>(
    editable ? null : 'floods/root',
    true,
  );

  React.useEffect(() => {
    if (!allRoutes || !Object.keys(localReports || {})?.length) return;
    const newLocalReports = { ...localReports };
    Object.keys(localReports).forEach((routeId) => {
      const report = localReports[routeId];
      const rootRoute = allRoutes[routeId];
      if (!rootRoute) return;
      if (report.timestamp !== toISOString(rootRoute.updatedAt)) {
        delete newLocalReports[routeId];
      }
    });
    if (
      Object.keys(newLocalReports).length !== Object.keys(localReports).length
    ) {
      setLocalReports(newLocalReports);
    }
  }, [allRoutes, localReports]);

  const items = React.useMemo(() => {
    if (!allRoutes) return [];
    return Object.keys(allRoutes)
      .map((id) => {
        if (!id || ['undefined', 'id', 'updatedAt'].includes(id)) return null;
        const route = allRoutes[id];
        if (!route || typeof route !== 'object' || !route.nearestStations)
          return null;
        const report = localReports[id];
        return {
          ...route,
          ...report,
          id,
        } satisfies Route;
      })
      .filter(Boolean) as Route[];
  }, [allRoutes, localReports]);

  return items;
};

export default useRootRoute;
