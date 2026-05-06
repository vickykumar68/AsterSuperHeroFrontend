// File: AsterHeros.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  LucideLayoutDashboard,
  LucideSearch,
  LucideChevronLeft,
  LucideChevronRight,
  LucideTable,
} from "lucide-react";
import badge_1 from "../assets/badges/badge_1.png";
import badge_2 from "../assets/badges/badge_2.png";
import badge_3 from "../assets/badges/badge_3.png";
import badge_4 from "../assets/badges/badge_4.png";
import badge_5 from "../assets/badges/badge_5.png";
export default function AsterHeros() {
  const navigate = useNavigate();

  // data + UI state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topN, setTopN] = useState(100);
  const [mode, setMode] = useState("auto"); // auto | fixed
  const [search, setSearch] = useState("");

  const abortRef = useRef(null);

  // fetch
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const params = new URLSearchParams({ top: String(topN), mode });
      const res = await fetch(`/api/v1/superhero/admin/aster-heroes?${params.toString()}`, {
        method: "GET",
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // client-side filtering + pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const filteredData = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((r) =>
      [r.name, r.email, String(r.total_score), String(r.days_filled)]
        .some((v) => (v || "").toLowerCase().includes(q))
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageSlice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  // CSV / Excel export
  const exportToCSV = () => {
    if (!filteredData.length) return;
    const headers = ["Name", "Email", "Total Score", "Days Filled", "Days Missing", "Completion %", "Start", "End"];
    const rows = filteredData.map(item => [
      item.name || "",
      item.email || "",
      item.total_score ?? 0,
      item.days_filled ?? 0,
      item.days_missing ?? 30,
      item.completion_percentage ?? 0,
      item.start_date || "",
      item.campaign_end_date || ""
    ]);
    const csvContent = [headers, ...rows].map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aster_heroes_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    if (!filteredData.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map(item => ({
        Name: item.name || "",
        Email: item.email || "",
        "Total Score": item.total_score ?? 0,
        "Days Filled": item.days_filled ?? 0,
        "Days Missing": item.days_missing ?? 30,
        "Completion %": item.completion_percentage ?? 0,
        "Start Date": item.start_date || "",
        "End Date": item.campaign_end_date || "",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AsterHeroes");
    XLSX.writeFile(workbook, `aster_heroes_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // helper: badge URLs (replace with your hosted GIF URLs)
  const badgeUrls = {
    1: badge_1,      // best for #1 (big)
    2: badge_2,
    3: badge_3,
    stars: badge_4,         // for ranks 4-10
    ribbon: badge_5,       // for ranks 11-20
  };

  const getBadgeUrl = (rank) => {
    if (!rank || rank > 20) return null;
    if (rank === 1) return badgeUrls[1];
    if (rank === 2) return badgeUrls[2];
    if (rank === 3) return badgeUrls[3];
    if (rank >= 4 && rank <= 10) return badgeUrls.stars;
    if (rank >= 11 && rank <= 20) return badgeUrls.ribbon;
    return null;
  };

  // fallback emoji component when GIF missing
  const BadgeFallback = ({ rank }) => {
    if (rank === 1) return <span title="#1" className="text-2xl">🏆</span>;
    if (rank === 2) return <span title="#2" className="text-2xl">🥈</span>;
    if (rank === 3) return <span title="#3" className="text-2xl">🥉</span>;
    return <span title={`#${rank}`} className="text-xl">🎖️</span>;
  };

  // logout (adjust to your auth)
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-3">
          <LucideLayoutDashboard className="text-indigo-600" size={24} />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Aster Heroes — Campaign Leaderboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/dashboard/users')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm">Users</button>
          <button onClick={() => navigate('/admin/dashboard')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Dashboard</button>
          <div className="flex items-center gap-2">
            <button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm">Export CSV</button>
            <button onClick={exportToExcel} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-sm">Export Excel</button>
          </div>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm">Logout</button>
        </div>
      </header>

      {/* Controls */}
      <main className="p-6 w-full overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <label className="text-sm">Mode:</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)} className="p-2 rounded border" onBlur={fetchData}>
                <option value="auto">Auto (per-user 30-day)</option>
                <option value="fixed">Fixed window</option>
              </select>

              <label className="text-sm">Top N:</label>
              <input type="number" min={1} max={5000} value={topN} onChange={(e) => setTopN(Number(e.target.value))} onBlur={fetchData} className="w-24 p-2 rounded border" />

              <button onClick={fetchData} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Refresh</button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search name, email or score..."
                  className="pl-10 pr-3 py-2 border rounded-md w-64"
                />
                <LucideSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>

              <label className="text-sm">Page size:</label>
              <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="p-2 rounded border">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white border rounded shadow-sm">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LucideTable />
                <strong>Leaderboard</strong>
                <span className="text-sm text-gray-500">({filteredData.length} users)</span>
              </div>
              <div className="text-sm text-gray-500">Showing {Math.min((page-1)*pageSize+1, filteredData.length)} - {Math.min(page*pageSize, filteredData.length)} of {filteredData.length}</div>
            </div>

            {loading ? (
              <div className="p-6 text-center">Loading…</div>
            ) : error ? (
              <div className="p-6 text-center text-red-600">Error: {error}</div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S.No.</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Badge</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total Score</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Days Filled</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Days Missing</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Completion %</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Start</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">End</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pageSlice.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-4 py-6 text-center text-gray-500">No users found.</td>
                      </tr>
                    ) : (
                      pageSlice.map((row, idx) => {
                        const globalRank = (page - 1) * pageSize + idx + 1;
                        const badgeUrl = getBadgeUrl(globalRank);
                        return (
                          <tr key={row.user_id} className="hover:bg-gray-100 transition">
                            <td className="px-4 py-2">{globalRank}</td>

                            {/* Badge cell */}
                            <td className="px-4 py-2">
                              {badgeUrl ? (
                                <img
                                  src={badgeUrl}
                                  alt={`badge-${globalRank}`}
                                  className="w-24 h-24 object-contain"
                                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none'; }}
                                />
                              ) : (
                                <BadgeFallback rank={globalRank} />
                              )}
                            </td>

                            <td className="px-4 py-2 font-medium">{row.name || '—'}</td>
                            <td className="px-4 py-2">{row.email || '—'}</td>
                            <td className="px-4 py-2 text-right">{row.total_score ?? 0}</td>
                            <td className="px-4 py-2 text-right">{row.days_filled ?? 0}</td>
                            <td className="px-4 py-2 text-right">{row.days_missing ?? 30}</td>
                            <td className="px-4 py-2 text-right">{row.completion_percentage ?? 0}%</td>
                            <td className="px-4 py-2">{row.start_date ? new Date(row.start_date).toLocaleDateString() : '—'}</td>
                            <td className="px-4 py-2">{row.campaign_end_date ? new Date(row.campaign_end_date).toLocaleDateString() : '—'}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="p-3 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>

              <div className="flex items-center gap-2">
                <button onClick={() => setPage(1)} disabled={page===1} className="p-2 rounded border disabled:opacity-50">First</button>
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="p-2 rounded border disabled:opacity-50"><LucideChevronLeft /></button>
                <div className="px-3">{page}</div>
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="p-2 rounded border disabled:opacity-50"><LucideChevronRight /></button>
                <button onClick={() => setPage(totalPages)} disabled={page===totalPages} className="p-2 rounded border disabled:opacity-50">Last</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
