import faker, { title } from './faker';
import generateDate from './dateGenerator';

const generate = () =>
  ({
    id: faker.string.uuid(),
    createdAt: generateDate() as Date,
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    organisation: faker.company.name(),
    role: title(),
  }) satisfies Contact;

export default generate;
