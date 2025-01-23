import faker from './faker';

const generate = () =>
  ({
    lat: faker.number.float({
      fractionDigits: 4,
      max: 52.21844771282599,
      min: 52.171914221761725,
    }),
    lng: faker.number.float({
      fractionDigits: 4,
      max: -2.1624377736798466,
      min: -2.2649166060232164,
    }),
  }) satisfies google.maps.LatLngLiteral;

export default generate;
