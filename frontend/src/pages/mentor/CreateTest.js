import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/test", { title, description });
      navigate("/mentor");
    } catch (err) {
      alert("Failed to create test");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Test</h2>

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

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
