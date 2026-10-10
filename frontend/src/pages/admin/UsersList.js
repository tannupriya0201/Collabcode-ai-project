import UserRow from "./UserRow";

export default function UsersList({
  users,
  onBlock,
  onUnblock,
  onRoleChange,
}) {
  return (
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="4">No users found</td>
          </tr>
        ) : (
          users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onBlock={onBlock}
              onUnblock={onUnblock}
              onRoleChange={onRoleChange}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
