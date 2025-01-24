import faker from './faker';
import media, { reset as mediaReset } from './mediaGenerator';
import user from './userGenerator';
import date from './dateGenerator';
import campaign from './campaignGenerator';
import action from './actionGenerator';
import goal from './goalGenerator';
import app from './appGenerator';
import station from './stationGenerator';
import route, { rootRoutes } from './routeGenerator';
import latLng from './latLngGenerator';
import contact from './contactGenerator';

const mediaTypes = ['image'];

const itemTypes: { [key: string]: (opts: { [key: string]: any }) => any } = {
  app,
  user,
  contact,
  contacts: contact,
  users: user,
  media,
  date,
  campaign,
  campaigns: campaign,
  action,
  actions: action,
  goal,
  station,
  route,
  rootRoutes,
  latLng,
};

mediaTypes.forEach((key: string) => {
  itemTypes[key] = (opts: object) => media({ type: key as 'image', ...opts });
});

const obj: { seedVal: number | undefined } = { seedVal: undefined };

export const seed = (val: string | number | undefined) => {
  if (val) {
    let num: number;
    if (typeof val === 'string') {
      num = val.split('').reduce((v, char) => v + char.charCodeAt(0), 0);
    } else {
      num = val;
    }
    faker.seed(num);
    obj.seedVal = num;
    mediaReset();
  }
};

const parseDates = <T>(obj: T, fields: string[]): T => {
  if (!fields) return obj as T;
  const newObj = {
    ...obj,
  } as T;
  fields.forEach((field: string) => {
    if (obj[field as keyof typeof obj]) {
      const seconds = Number(newObj[field as keyof typeof newObj]) / 1000;
      newObj[field] = { seconds };
    }
  });
  return newObj;
};

const generateObj = <T>(
  itemName: string,
  opts: { [key: string]: any } = {},
): T => {
  const obj = itemTypes[itemName]?.(opts || {}) as T;
  return parseDates<T>(obj, opts.parseDates);
};

const generator = <T>(
  itemName: string,
  opts?: { count?: number; [key: string]: any },
) => {
  try {
    if (opts?.count) {
      const arr: T[] = Array.from(Array(opts.count))
        .map(() => generateObj<T>(itemName, opts))
        .filter((val) => val);
      return arr;
    }
    return generateObj<T>(itemName, opts);
  } catch (err: any) {
    console.error({ itemName, opts });
    throw new Error(err);
  }
};

export default generator;
