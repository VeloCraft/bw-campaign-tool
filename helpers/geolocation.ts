export const nearestStations = (
  center: google.maps.LatLng | null,
  stations: Station[],
): [[string, string], number] => {
  if (!center) return [['', ''], 0];
  const nearest = stations
    .map(({ position, ...other }) => ({
      position,
      distance: google.maps.geometry.spherical.computeDistanceBetween(
        center,
        position,
      ),
      ...other,
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2);
  const weight =
    1 -
    nearest[0].distance /
      nearest.reduce((acc, { distance }) => acc + distance, 0);
  return [nearest.map(({ id }) => id) as [string, string], weight];
};
