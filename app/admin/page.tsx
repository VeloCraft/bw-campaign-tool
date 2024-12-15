import {fetchUsers} from '@/app/lib/user'
import UserTable from '@/components/admin/user-table'

export default async function Admin() {

  const users = await fetchUsers();

  return (
    <div>
      <h1>Admin</h1>
      <UserTable users={users} />
  </div>);
}
