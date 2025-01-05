import faker from './faker';

const generate = () =>
  ({
    id: faker.string.uuid(),
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
    roles: [],
    photoURL: faker.image.avatar(),
  }) satisfies User;

export default generate;
