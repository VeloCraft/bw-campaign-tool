import faker from './faker';

const generate = ({ roles }: { roles?: Role[] }) =>
  ({
    id: faker.string.uuid(),
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
    roles: roles || ['admin', 'editor'].filter(() => faker.datatype.boolean()),
    photoURL: faker.image.avatar(),
  }) satisfies User;

export default generate;
