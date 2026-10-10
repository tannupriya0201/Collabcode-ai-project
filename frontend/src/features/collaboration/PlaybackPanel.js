import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PlaybackPanel({ roomId, setCode }) {
  const [snapshots, setSnapshots] = useState([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    api.get(`/collaboration/playback/${roomId}`).then((res) => {
      setSnapshots(res.data.snapshots);
    });
  }, [roomId]);

  const play = async () => {
    setPlaying(true);

    for (let snap of snapshots) {
      setCode(snap.code);
      await new Promise((r) => setTimeout(r, 700));
    }

    setPlaying(false);
  };

  return (
    <div style={{ padding: 10, borderTop: "1px solid #ddd" }}>
      <h4>⏪ Playback</h4>
      <button onClick={play} disabled={playing}>
        {playing ? "Playing..." : "Play Session"}
      </button>
    </div>
  );
}
