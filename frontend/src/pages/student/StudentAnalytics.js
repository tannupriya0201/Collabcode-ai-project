import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // 🔹 primary (recommended)
        const res = await api.get("/student/analytics");
        setStats(res.data);
      } catch (err) {
        try {
          // 🔹 fallback (old path support)
          const res = await api.get("/analytics/student");
          setStats(res.data);
        } catch (e) {
          setStats(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  if (!stats) return <p>No analytics data available</p>;

  return (
    <div>
      <h2>Learning Analytics</h2>

      <p>🕒 Time Spent: {stats.timeSpent} mins</p>
      <p>✍️ Code Edits: {stats.edits}</p>
      <p>🎓 Mentor Interactions: {stats.mentorInteractions}</p>
    </div>
  );
}
