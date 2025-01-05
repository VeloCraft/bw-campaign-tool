import faker from './faker';
import generateMedia from './mediaGenerator';

const generate = () =>
  ({
    id: faker.string.uuid(),
    createdAt: faker.date.past(),
    broadcasterId: faker.string.uuid(),
    avatar: generateMedia({ type: 'image' }) as Media,
    name: faker.person.fullName(),
  }) satisfies WebrtcListener;

export default generate;
