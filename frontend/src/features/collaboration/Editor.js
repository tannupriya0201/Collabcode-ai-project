import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";

import { connectSocket } from "../../services/socket";
import LiveCursor from "./LiveCursor";
import TypingIndicator from "./TypingIndicator";
import ActiveUsersPanel from "./ActiveUsersPanel";
import CodeHistoryPanel from "./CodeHistoryPanel";
import AIAssistant from "./AIAssistant";
import PlaybackPanel from "./PlaybackPanel";
import AnalyticsPanel from "./AnalyticsPanel";

export default function CollaborationEditor() {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [xp, setXp] = useState(0);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationRef = useRef([]);

  const socket = connectSocket();
  const role = localStorage.getItem("role");
  const username = role || "User";

  /* ======================
     JOIN ROOM + CODE SYNC
  ====================== */
  useEffect(() => {
    socket.emit("room:create", {
      roomId,
      user: { username },
    });

    socket.emit("room:join", {
      roomId,
      user: { username },
    });

    socket.on("code:update", (newCode) => {
      setCode(newCode || "");
    });

    return () => socket.off("code:update");
  }, [roomId, socket, username]);

  /* ======================
     🎮 XP AUTO UPDATE
  ====================== */
  useEffect(() => {
    socket.on("xp:update", (amount) => {
      if (typeof amount === "number") {
        setXp((prev) => prev + amount);
      }
    });

    return () => socket.off("xp:update");
  }, [socket]);

  /* ======================
     MENTOR CONTROL
  ====================== */
  useEffect(() => {
    socket.on("mentor:control", ({ line, lock }) => {
      if (lock !== undefined) setIsLocked(lock);

      if (line && editorRef.current && monacoRef.current) {
        decorationRef.current =
          editorRef.current.deltaDecorations(
            decorationRef.current,
            [
              {
                range: new monacoRef.current.Range(line, 1, line, 1),
                options: {
                  isWholeLine: true,
                  className: "mentor-highlight",
                },
              },
            ]
          );
      }
    });

    return () => socket.off("mentor:control");
  }, [socket]);

  /* ======================
     CODE CHANGE
  ====================== */
  const handleEditorChange = (value) => {
    if (isLocked) return;

    const updatedCode = value || "";
    setCode(updatedCode);

    socket.emit("code:change", {
      roomId,
      code: updatedCode,
    });

    socket.emit("xp:add", {
      roomId,
      amount: 5,
    });

    socket.emit("typing", {
      roomId,
      username,
      isTyping: true,
    });

    setTimeout(() => {
      socket.emit("typing", {
        roomId,
        username,
        isTyping: false,
      });
    }, 700);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: 10 }}>
        <h3>Room: {roomId}</h3>
        <p><b>XP:</b> {xp}</p>

        <MonacoEditor
          height="70vh"
          value={code}
          defaultLanguage="javascript"
          onChange={handleEditorChange}
          theme="vs-dark"
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monacoRef.current = monaco;
          }}
          options={{
            readOnly: isLocked,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />

        {isLocked && <p style={{ color: "red" }}>🔒 Mentor explaining…</p>}

        <TypingIndicator roomId={roomId} />
        <LiveCursor roomId={roomId} />
      </div>

      <div style={{ width: 300 }}>
        <ActiveUsersPanel roomId={roomId} />
        <CodeHistoryPanel roomId={roomId} onSelect={setCode} />
        <AIAssistant code={code} />
      </div>

      <PlaybackPanel roomId={roomId} setCode={setCode} />
      <AnalyticsPanel roomId={roomId} />
    </div>
  );
}
