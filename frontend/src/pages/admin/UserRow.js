import RoleDropdown from "./RoleDropdown";

export default function UserRow({
  user,
  onBlock,
  onUnblock,
  onRoleChange,
}) {
  const isAdmin = user.role === "admin";

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>

      {/* ROLE COLUMN */}
      <td>
        {isAdmin ? (
          <b>Admin</b>
        ) : (
          <RoleDropdown
            role={user.role}
            onChange={(newRole) =>
              onRoleChange(user._id, newRole)
            }
          />
        )}
      </td>

      {/* ACTION COLUMN */}
      <td>
        {isAdmin ? (
          <span>—</span>
        ) : user.isBlocked ? (
          <button onClick={() => onUnblock(user._id)}>
            Unblock
          </button>
        ) : (
          <button onClick={() => onBlock(user._id)}>
            Block
          </button>
        )}
      </td>
    </tr>
  );
}
