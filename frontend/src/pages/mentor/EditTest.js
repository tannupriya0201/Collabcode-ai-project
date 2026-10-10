import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function EditTest() {
  const { id } = useParams(); // test id from route
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD EXISTING TEST
  ========================= */
  useEffect(() => {
    const loadTest = async () => {
      try {
        const res = await api.get(`/test/${id}`);
        setTitle(res.data.title || "");
        setDescription(res.data.description || "");
      } catch (err) {
        alert("Failed to load test");
        navigate("/mentor");
      } finally {
        setLoading(false);
      }
    };

    loadTest();
  }, [id, navigate]);

  /* =========================
     UPDATE TEST
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/test/${id}`, {
        title,
        description,
      });

      navigate("/mentor");
    } catch (err) {
      alert("Failed to update test");
    }
  };

  if (loading) return <p>Loading test...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Test</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Test title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit">Update Test</button>
        <button
          type="button"
          onClick={() => navigate("/mentor")}
          style={{ marginLeft: 10 }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
