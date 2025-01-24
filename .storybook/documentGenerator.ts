import faker, { title, description } from './faker';
import generateMedia from './mediaGenerator';

const generate = () =>
  ({
    id: faker.string.uuid(),
    file: generateMedia() as Media,
    name: title(),
    description: description(),
    campaignId: faker.string.uuid(),
  }) satisfies DocumentDoc;

export default generate;
