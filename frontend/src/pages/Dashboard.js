
import AdminDashboard from "./AdminDashboard";
import MentorDashboard from "./MentorDashboard";
import StudentDashboard from "./StudentDashboard";

function Dashboard() {
  const role = localStorage.getItem("role");

  if (role === "admin") return <AdminDashboard />;
  if (role === "mentor") return <MentorDashboard />;
  return <StudentDashboard />;
}

export default Dashboard;
