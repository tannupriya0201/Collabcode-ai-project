import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [action, setAction] = useState("ALL");
  const [page, setPage] = useState(1);

  const PER_PAGE = 6;

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [action, logs, page]);

  const fetchLogs = async () => {
    const res = await api.get("/admin/auditlogs");
    setLogs(res.data || []);
    setFiltered(res.data || []);
  };

  const applyFilter = () => {
    let data = [...logs];

    if (action !== "ALL") {
      data = data.filter((log) => log.action === action);
    }

    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    setFiltered(data.slice(start, end));
  };

  const exportCSV = () => {
    const rows = [
      ["Action", "Performed By", "Date"],
      ...logs.map((l) => [
        l.action,
        l.performedBy?.email || "System",
        new Date(l.createdAt).toLocaleString(),
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.csv";
    a.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Audit Logs</h2>

      {/* FILTER */}
      <select
        value={action}
        onChange={(e) => {
          setAction(e.target.value);
          setPage(1);
        }}
      >
        <option value="ALL">All</option>
        <option value="LOGIN">LOGIN</option>
        <option value="BLOCK_USER">BLOCK</option>
        <option value="UNBLOCK_USER">UNBLOCK</option>
        <option value="ROLE_CHANGE">ROLE CHANGE</option>
      </select>

      <button onClick={exportCSV} style={{ marginLeft: 10 }}>
        Export CSV
      </button>

      {/* TABLE */}
      <table border="1" cellPadding="8" style={{ marginTop: 15 }}>
        <thead>
          <tr>
            <th>Action</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((log) => (
            <tr key={log._id}>
              <td>{log.action}</td>
              <td>{log.performedBy?.email || "System"}</td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: 10 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button
          disabled={filtered.length < PER_PAGE}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
