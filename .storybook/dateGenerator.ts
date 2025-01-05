import faker from './faker';

const date = (opts: { [key: string]: any }): Date => {
  const { future }: { future?: boolean } = opts || { future: false };
  let date: Date;
  if (process.env.NODE_ENV === 'test') {
    if (future) {
      date = new Date(2222, 2, 22);
    } else {
      date = new Date(2022, 2, 22);
    }
  } else if (future) {
    date = faker.date.future();
    date.setFullYear(date.getFullYear() + 10);
  } else {
    date = faker.date.past();
  }
  return date;
};

export default date;
