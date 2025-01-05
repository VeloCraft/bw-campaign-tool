import faker, { title, description, oneOf } from './faker';

const generate = () =>
  ({
    id: faker.string.uuid(),
    name: title(),
    description: description(),
    status: oneOf(['active', 'inactive']),
    campaignId: faker.string.uuid(),
    campaignName: title(),
  }) satisfies Goal;

export default generate;
