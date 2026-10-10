import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentLearning() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/student/learning").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Learning</h2>

      <p><b>XP:</b> {data.xp}</p>
      <p><b>Level:</b> {data.level}</p>

      <h4>Joined Rooms</h4>
      <ul>
        {data.joinedRooms.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
