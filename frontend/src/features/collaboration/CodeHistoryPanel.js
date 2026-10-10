import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function CodeHistoryPanel({ roomId, onSelect }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    setLoading(true);

    api
      .get(`/collaboration/history/${roomId}`)
      .then((res) => {
        setHistory(res.data.snapshots || []);
      })
      .catch(() => {
        setHistory([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roomId]);

  return (
    <div
      style={{
        width: 240,
        borderLeft: "1px solid #ddd",
        padding: 10,
        overflowY: "auto",
      }}
    >
      <h4>💾 Code History</h4>

      {loading && <p>Loading history...</p>}

      {!loading && history.length === 0 && (
        <p style={{ fontSize: 12 }}>No snapshots yet</p>
      )}

      {!loading &&
        history.map((snap) => (
          <div
            key={snap._id}
            style={{
              cursor: "pointer",
              marginBottom: 6,
              fontSize: 12,
            }}
            onClick={() => onSelect(snap.code)}
          >
            🕒 {new Date(snap.createdAt).toLocaleTimeString()}
          </div>
        ))}
    </div>
  );
}
