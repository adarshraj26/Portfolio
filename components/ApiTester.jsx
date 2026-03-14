"use client";
import { useState } from "react";

export default function ApiTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendRequest() {
    setLoading(true);
    setError("");
    setResponse(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        ...(method !== "GET" && body ? { body } : {}),
      });
      const text = await res.text();
      setResponse(text);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mt-8 border border-cyan-200 dark:border-slate-700">
      <h2 className="font-bold text-lg mb-4 text-cyan-500">API Tester</h2>
      <div className="flex gap-2 mb-2">
        <select value={method} onChange={e => setMethod(e.target.value)} className="rounded px-2 py-1 border dark:bg-slate-800">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="flex-1 rounded px-2 py-1 border dark:bg-slate-800" />
        <button onClick={sendRequest} disabled={loading || !url} className="px-4 py-1.5 rounded bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition disabled:opacity-60">
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {(method !== "GET") && (
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Request body (JSON)" rows={3} className="w-full rounded px-2 py-1 border dark:bg-slate-800 mb-2 font-mono text-xs" />
      )}
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      {response && (
        <pre className="bg-slate-100 dark:bg-slate-800 rounded p-3 text-xs overflow-x-auto mt-2 max-h-64 whitespace-pre-wrap">
          {response}
        </pre>
      )}
    </div>
  );
}
