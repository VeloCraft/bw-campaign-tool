import { faker } from '@faker-js/faker';
import generator from './generator';

type MinMax = { min: number; max: number };

export const generate = generator;

export const seed = (val: string | number | undefined) => {
  if (val) {
    let num: number;
    if (typeof val === 'string') {
      num = val.split('').reduce((v, char) => v + char.charCodeAt(0), 0);
    } else {
      num = val;
    }
    faker.seed(num);
  }
};

export const title = (args?: MinMax | number): string => {
  let min = 1;
  let max = 5;
  if (args) {
    if (typeof args === 'object' && (args?.min || args?.max)) {
      min = args.min || 1;
      max = args.max || 5;
    } else {
      max = args as number;
    }
  }
  return faker.lorem
    .words(faker.number.int({ min, max }))
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.substring(1)}`)
    .join(' ');
};

export const description = (max = 3): string =>
  faker.lorem.paragraphs(faker.number.int({ min: 1, max }), '\n\n');

export const arrayOf = <T>(fn: () => T, { min = 1, max = 5 } = {}) =>
  Array.from({ length: faker.number.int({ min, max }) }, fn);

export const oneOf = <T>(arr: T[]) =>
  arr[faker.number.int({ min: 0, max: arr.length - 1 })];

const defaultFaker = faker;

export default defaultFaker;
