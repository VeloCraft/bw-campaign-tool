export default function UserTable({ users }: { users: string[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((email) => (
          <tr key={email}>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
