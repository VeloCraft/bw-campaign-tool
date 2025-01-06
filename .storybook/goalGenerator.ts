import faker, { title, description, oneOf } from './faker';
import dateGenerator from './dateGenerator';

const generate = () =>
  ({
    id: faker.string.uuid(),
    name: title(),
    description: description(),
    status: oneOf(['active', 'complete']),
    campaignId: faker.string.uuid(),
    createdAt: dateGenerator() as Date,
  }) satisfies Goal;

export default generate;
