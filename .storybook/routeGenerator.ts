import faker, { title, arrayOf } from './faker';
import generateDate from './dateGenerator';
import generateLatLng from './latLngGenerator';

const generate = ({ stations: _stations }) => {
  const stations =
    _stations ||
    arrayOf(() => ({ id: faker.string.uuid() }), { min: 5, max: 10 });
  const stationIndex = faker.number.int({ min: 0, max: stations.length - 2 });

  return {
    id: faker.string.uuid(),
    summary: title(),
    path: faker.lorem.slug(),
    distance: `${faker.number.float({ fractionDigits: 1, min: 0.1, max: 1 })} km`,
    position: generateLatLng() as google.maps.LatLngLiteral,
    nearestStations: [stations[stationIndex].id, stations[stationIndex + 1].id],
    stationWeight: faker.number.float({
      fractionDigits: 2,
      min: 0.01,
      max: 0.99,
    }),
    level: faker.number.float({ fractionDigits: 2, min: 0, max: 5 }),
    hazardous: faker.datatype.boolean(),
    updatedAt: generateDate() as Date,
    reports: arrayOf(() => routeReport(), { min: 0, max: 5 }) as RouteReport[],
  } satisfies Route;
};

export const rootRoutes = ({ stations }) => {
  const routes = arrayOf(() => generate({ stations }), { min: 12, max: 24 });
  return {
    updatedAt: generateDate() as Date,
    ...(routes.reduce((acc, route) => {
      const { id, ...rest } = route;
      acc[id] = rest;
      return acc;
    }, {} as RootRoutes) as Omit<RootRoutes, 'updatedAt'>),
  } satisfies RootRoutes;
};

export const routeReport = () =>
  ({
    userId: faker.string.uuid(),
    hazardous: faker.datatype.boolean(),
    level: faker.number.float({ fractionDigits: 2, min: 0, max: 5 }),
  }) satisfies RouteReport;

export default generate;
