import faker, { title, description, oneOf, arrayOf } from './faker';
import generateGoal from './goalGenerator';
import generateDate from './dateGenerator';

const generate = () =>
  ({
    id: faker.string.uuid(),
    name: title(),
    description: description(),
    status: oneOf(['active', 'inactive']),
    contribution: description(),
    goals: arrayOf(() => generateGoal()),
    userId: faker.string.uuid(),
    updatedAt: generateDate() as Date,
    createdAt: generateDate() as Date,
  }) satisfies Campaign;

export default generate;
