export default function RoleDropdown({ role, onChange }) {
  return (
    <select value={role} onChange={(e) => onChange(e.target.value)}>
      <option value="student">Student</option>
      <option value="mentor">Mentor</option>
    </select>
  );
}
