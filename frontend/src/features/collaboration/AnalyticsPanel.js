import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AnalyticsPanel({ roomId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/analytics/room/${roomId}`).then((res) => {
      setData(res.data.roomAnalytics);
    });
  }, [roomId]);

  return (
    <div style={{ padding: 10, borderTop: "1px solid #ddd" }}>
      <h4>📊 Learning Analytics</h4>

      {data.map((d, i) => (
        <div key={i} style={{ fontSize: 12 }}>
          👤 {d.user} |
          ⏱ {Math.round(d.timeSpent / 1000)}s |
          ✍️ edits: {d.edits}
        </div>
      ))}
    </div>
  );
}
