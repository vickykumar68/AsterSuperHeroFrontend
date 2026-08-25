import React, { useEffect, useState, useContext, useMemo } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  LucideLayoutDashboard,
  LucideSearch,
  LucideChevronLeft,
  LucideChevronRight,
  LucideTable,
  LucideInfo,
  LucideCalendarDays,
  LucideFileSpreadsheet,
  LucideDownload,
  LucideLogOut,
  LucideTrophy,
  LucideUsers,
  LucideCheckCircle2,
} from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { apiUrl } from "../api";

const AdminDashboard = () => {
  const { logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search + filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState(null);

  // Fetch data on filter change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `/api/v1/superhero/admin/dashboard?filter=${filterType}`;
        if (filterType !== "all" && filterDate) url += `&date=${filterDate}`;

        const res = await fetch(apiUrl(url), { credentials: "include" });
        const data = await res.json();

        if (res.ok) {
          setDashboardData(Array.isArray(data) ? data : data.items || []);
          setError("");
        } else {
          setError(data.message || "Failed to fetch dashboard data");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setCurrentPage(1);
  }, [filterType, filterDate]);

  // Aggregate data per user (guarantees 1 row per user with combined count & score)
  const aggregatedData = useMemo(() => {
    const userMap = new Map();

    dashboardData.forEach((item) => {
      const userKey = (item.username || item.name || item.id || "").toLowerCase().trim();
      if (!userKey) return;

      if (!userMap.has(userKey)) {
        userMap.set(userKey, {
          id: item.id,
          name: item.name,
          username: item.username,
          count: item.count ? Number(item.count) : 1,
          score: Number(item.score) || 0,
          payload: item.payload,
          tracks: Array.isArray(item.tracks)
            ? [...item.tracks]
            : [
                {
                  id: item.id,
                  entryDate: item.created_at ? new Date(item.created_at).toISOString().split("T")[0] : "",
                  score: item.score,
                  payload: item.payload,
                  createdAt: item.created_at,
                },
              ],
          created_at: item.created_at,
          updated_at: item.updated_at,
        });
      } else {
        const existing = userMap.get(userKey);
        existing.count += item.count ? Number(item.count) : 1;
        existing.score += Number(item.score) || 0;

        if (Array.isArray(item.tracks)) {
          existing.tracks.push(...item.tracks);
        } else {
          existing.tracks.push({
            id: item.id,
            entryDate: item.created_at ? new Date(item.created_at).toISOString().split("T")[0] : "",
            score: item.score,
            payload: item.payload,
            createdAt: item.created_at,
          });
        }

        // Keep latest date & payload
        if (new Date(item.created_at || 0) > new Date(existing.created_at || 0)) {
          existing.created_at = item.created_at;
          existing.payload = item.payload;
        }
      }
    });

    const list = Array.from(userMap.values());
    list.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.count !== a.count) return b.count - a.count;
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

    return list;
  }, [dashboardData]);

  // Client-side search across name and username (email)
  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return aggregatedData;
    return aggregatedData.filter((item) => {
      const name = item?.name || "";
      const username = item?.username || "";
      return name.toLowerCase().includes(query) || username.toLowerCase().includes(query);
    });
  }, [aggregatedData, searchQuery]);

  // Export CSV
  const exportToCSV = () => {
    if (!filteredData.length) return;
    const headers = ["Name", "Username", "Total Attempts", "Score", "Period", "Created At", "Updated At"];
    const rows = filteredData.map((item) => [
      item.name || "",
      item.username || "",
      item.count || 0,
      item.score || 0,
      filterType.toUpperCase(),
      item.created_at ? new Date(item.created_at).toLocaleString() : "",
      item.updated_at ? new Date(item.updated_at).toLocaleString() : ""
    ]);
    const csvContent = [headers, ...rows].map((e) => e.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin_dashboard_${filterType}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export Excel
  const exportToExcel = () => {
    if (!filteredData.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        Name: item.name || "",
        Username: item.username || "",
        "Total Attempts": item.count || 0,
        Score: item.score || 0,
        Period: filterType.toUpperCase(),
        "Created At": item.created_at ? new Date(item.created_at).toLocaleString() : "",
        "Updated At": item.updated_at ? new Date(item.updated_at).toLocaleString() : ""
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard");
    XLSX.writeFile(workbook, `admin_dashboard_${filterType}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Modal controls
  const openModal = (item) => {
    setModalPayload(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalPayload(null);
  };

  const keyLabels = {
    hydration: "Hydration",
    dental: "Dental Care",
    physical: "Physical Activity",
    healthy: "Healthy Eating",
    screenTime: "Screen Time",
    germProtection: "Germ Protection",
    kindness: "Kindness Acts",
    submittedAnswers: "Tasks Completed",
    dentalPoints: "Dental Points",
    germProtectionPoints: "Germ Protection Points",
    healthyPoints: "Healthy Points",
    hydrationPoints: "Hydration Points",
    kindnessPoints: "Kindness Points",
    physicalPoints: "Physical Points",
    screenTimePoints: "Screen Time Points"
  };

  const renderPayloadDetails = (payload) => {
    let payloadObj = {};
    try {
      payloadObj = typeof payload === "string" ? JSON.parse(payload) : payload;
    } catch {
      payloadObj = {};
    }
    if (!payloadObj || Object.keys(payloadObj).length === 0) {
      return <p className="text-gray-500 text-sm">No questionnaire payload available.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        {Object.entries(payloadObj).map(([k, v]) => {
          if (v === undefined || v === null || v === "") return null;
          const displayKey = keyLabels[k] || k;
          const displayVal = Array.isArray(v) ? v.join(", ") : String(v);
          return (
            <div key={k} className="bg-white p-2 rounded border border-gray-200">
              <span className="font-semibold text-gray-700">{displayKey}:</span>{" "}
              <span className="text-gray-600">{displayVal}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md gap-3">
        <div className="flex items-center space-x-3">
          <LucideLayoutDashboard className="text-indigo-600" size={26} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Aster Heroes — Campaign Activity & Leaderboard</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate("/admin/dashboard/asterheros")}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3.5 rounded-lg text-sm transition shadow-sm"
          >
            <LucideTrophy size={16} />
            <span>Winners</span>
          </button>
          <button
            onClick={() => navigate("/admin/dashboard/users")}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3.5 rounded-lg text-sm transition shadow-sm"
          >
            <LucideUsers size={16} />
            <span>Users</span>
          </button>
          <button
            onClick={exportToCSV}
            disabled={!filteredData.length}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
          >
            <LucideDownload size={16} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportToExcel}
            disabled={!filteredData.length}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-3.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
          >
            <LucideFileSpreadsheet size={16} />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-3.5 rounded-lg text-sm transition shadow-sm"
          >
            <LucideLogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search & Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center mb-4 border-b border-gray-100 pb-3">
              <LucideSearch className="text-indigo-600 mr-2" size={20} />
              <h2 className="text-lg font-bold text-gray-800">Search & Filter Records</h2>
            </div>

            {/* Search input */}
            <div className="relative mb-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                placeholder="Search by Name or Email..."
              />
              <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Period Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Filter by Period
                </label>
                <div className="flex space-x-2">
                  {["all", "day", "week", "month"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition ${
                        filterType === type
                          ? "bg-indigo-600 text-white shadow-sm font-semibold"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider" htmlFor="date-input">
                    Target Date {filterDate && `(${filterType.toUpperCase()})`}
                  </label>
                  {filterDate && (
                    <button
                      onClick={() => setFilterDate("")}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Reset to Today
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="date"
                    id="date-input"
                    value={filterDate}
                    onChange={(e) => {
                      setFilterDate(e.target.value);
                      if (filterType === "all") {
                        setFilterType("day");
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                  <LucideCalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setFilterType("all");
                    setFilterDate("");
                    setSearchQuery("");
                  }}
                  className="w-full bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition text-sm shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <LucideTable className="text-indigo-600" size={20} />
                <h2 className="text-lg font-bold text-gray-800">User Performance & Count</h2>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Period: <strong className="uppercase">{filterType}</strong> {filterDate && `(Date: ${filterDate})`}
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500 font-medium">Loading records...</div>
            ) : error ? (
              <div className="p-6 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          S.No.
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-3.5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Count
                        </th>
                        <th className="px-6 py-3.5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3.5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Payload
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                          <tr key={item.id || index} className="hover:bg-indigo-50/40 transition">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {indexOfFirstItem + index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                              {item.name || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {item.username || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                {item.count || 0}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 text-center">
                              {item.score ?? 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              <button
                                onClick={() => openModal(item)}
                                title="View details"
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-1.5 rounded-full transition"
                              >
                                <LucideInfo size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                            No records found for this period.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
                  <span className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredData.length === 0 ? 0 : indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-semibold text-gray-900">
                      {Math.min(indexOfLastItem, filteredData.length)}
                    </span>{" "}
                    of <span className="font-semibold text-gray-900">{filteredData.length}</span> results
                  </span>
                  <nav className="inline-flex rounded-lg shadow-sm">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300 transition"
                    >
                      <LucideChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3.5 py-2 border-t border-b text-sm font-medium transition ${
                          currentPage === i + 1
                            ? "bg-indigo-600 border-indigo-600 text-white font-bold"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300 transition"
                    >
                      <LucideChevronRight size={16} />
                    </button>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && modalPayload && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative max-h-[85vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-indigo-600 text-white">
              <div>
                <h3 className="text-xl font-bold">Submission Details</h3>
                <p className="text-xs text-indigo-100 mt-0.5">
                  {modalPayload.name} ({modalPayload.username})
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white text-2xl font-bold transition p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-gray-700 flex-1">
              {/* Summary Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase">User</span>
                  <div className="font-bold text-gray-800 text-sm truncate">{modalPayload.name || "N/A"}</div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase">Attempts</span>
                  <div className="font-bold text-indigo-600 text-sm">{modalPayload.count || 0}</div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase">Total Score</span>
                  <div className="font-bold text-indigo-600 text-sm">{modalPayload.score ?? 0} pts</div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase">Filter</span>
                  <div className="font-bold text-gray-800 text-sm uppercase">{filterType}</div>
                </div>
              </div>

              {/* Submissions Breakdown */}
              {Array.isArray(modalPayload.tracks) && modalPayload.tracks.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                    <LucideCheckCircle2 className="text-emerald-500" size={16} />
                    Entry Log ({modalPayload.tracks.length} {modalPayload.tracks.length === 1 ? "entry" : "entries"})
                  </h4>

                  <div className="space-y-3">
                    {modalPayload.tracks.map((t, idx) => (
                      <div key={t.id || idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2.5">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <span className="font-bold text-sm text-gray-800">
                            Entry Date: <span className="text-indigo-600">{t.entryDate || "N/A"}</span>
                          </span>
                          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                            Score: {t.score ?? 0} pts
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Question & Answer Answers:</span>
                          {renderPayloadDetails(t.payload)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800 text-sm">Question & Answer Details:</h4>
                  {renderPayloadDetails(modalPayload.payload)}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
