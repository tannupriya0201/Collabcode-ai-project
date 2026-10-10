import { Link } from "react-router-dom";

export default function StudentLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 220, padding: 20, background: "#f4f4f4" }}>
        <h3>Student</h3>
        <ul>
          <li><Link to="/student">Dashboard</Link></li>
          <li><Link to="/student/learning">My Learning</Link></li>
          <li><Link to="/student/analytics">Analytics</Link></li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>
    </div>
  );
}
