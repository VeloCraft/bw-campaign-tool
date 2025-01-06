import faker, { arrayOf } from './faker';

const generate = ({ docId }: { docId?: 'permissions' | 'roles' }) => {
  let obj: AppPermissions | AppRoles;
  switch (docId) {
    case 'permissions':
      obj = { admin: [], editor: [] } as AppPermissions;
      return obj;
    case 'roles':
      obj = {} as AppRoles;
      const users = arrayOf(() => faker.internet.email(), { min: 12, max: 24 });
      ['admin', 'editor'].forEach((role) => {
        obj[role] = users.filter(() => faker.datatype.boolean());
      });
      return obj;
    default:
      return {};
  }
};

export default generate;
