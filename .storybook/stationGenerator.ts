import faker, { arrayOf } from './faker';
import generateDate from './dateGenerator';
import generateLatLng from './latLngGenerator';

const generate = () => {
  const levels = arrayOf(
    () => faker.number.float({ fractionDigits: 2, min: 0, max: 5 }),
    {
      min: 20,
      max: 50,
    },
  ) as number[];
  const date = generateDate() as Date;
  return {
    id: faker.string.uuid(),
    locationName: faker.location.city(),
    riverName: faker.person.firstName(),
    updatedAt: generateDate() as Date,
    position: generateLatLng() as google.maps.LatLngLiteral,
    levels,
    timestamps: levels.map((_, i, arr) => {
      const d = new Date(date);
      d.setDate(arr.length * -1 + i);
      return d.toISOString();
    }),
  } satisfies Station;
};

export default generate;
