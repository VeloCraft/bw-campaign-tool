const useRouteStatus = (
  route: Route,
  stations: Station[],
  editable: boolean,
): [RouteStatus | FilterValue, number] => {
  const values = route.nearestStations?.map((id: string) => {
    const station = stations.find((station) => station.id === id);
    return station.levels[station.levels.length - 1];
  });

  const level = values?.[0]
    ? values[0] * route.stationWeight + values[1] * (1 - route.stationWeight)
    : 5;

  let state: RouteStatus | FilterValue;
  if (editable) {
    if (!route.reports?.length) {
      state = 'noReports';
    } else {
      state = 'reports';
    }
  } else {
    if (route.hazardous) {
      state = 'hazardous';
    } else if (!route.level || level < route.level) {
      state = 'clear';
    } else {
      state = 'flooded';
    }
  }
  return [state, level];
};

export default useRouteStatus;
