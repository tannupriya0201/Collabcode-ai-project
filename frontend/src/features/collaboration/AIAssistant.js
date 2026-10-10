import { useState } from "react";

export default function AIAssistant({ code }) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = (type) => {
    if (!code || code.trim().length === 0) {
      setResponse("⚠️ No code found to analyze.");
      return;
    }

    setLoading(true);

    // ⏳ simulate AI thinking
    setTimeout(() => {
      if (type === "explain") {
        setResponse(
          "🧠 AI Explanation:\nThis code handles real-time collaboration using sockets, synchronizes editor content, and manages user interactions."
        );
      }

      if (type === "fix") {
        setResponse(
          "🛠 AI Suggestion:\nYou can improve performance by debouncing frequent socket emits (like code changes and typing events)."
        );
      }

      setLoading(false);
    }, 600);
  };

  return (
    <div
      style={{
        width: 260,
        borderLeft: "1px solid #ddd",
        padding: 10,
      }}
    >
      <h4>🤖 AI Assistant</h4>

      <button onClick={() => askAI("explain")} disabled={loading}>
        Explain Code
      </button>{" "}
      <button onClick={() => askAI("fix")} disabled={loading}>
        Suggest Fix
      </button>

      <pre
        style={{
          marginTop: 10,
          fontSize: 12,
          whiteSpace: "pre-wrap",
        }}
      >
        {loading ? "⏳ AI is thinking..." : response}
      </pre>
    </div>
  );
}
