import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/test/my-tests");
      setTests(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      await api.delete(`/test/${id}`);
      setTests((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading tests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ marginTop: 20 }}>
      {/* ❌ YAHAN SE <h2>My Tests</h2> HATA DIYA GAYA HAI */}

      {tests.length === 0 && <p>No tests created yet</p>}

      {tests.map((test) => (
        <div
          key={test._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 6,
            margin: "10px 0",
            padding: 12,
          }}
        >
          <h3>{test.title}</h3>

          {test.description && <p>{test.description}</p>}

          <small>
            Questions: {test.questions?.length || 0}
          </small>

          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => handleDelete(test._id)}
              style={{
                background: "#e11d48",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
