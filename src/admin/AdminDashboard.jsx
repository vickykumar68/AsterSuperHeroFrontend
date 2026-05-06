



import React, { useEffect, useState, useContext } from "react";
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
} from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuthContext";
 
const AdminDashboard = () => {
  // Export CSV logic (must be inside component to access filteredData)
  const exportToCSV = () => {
    if (!filteredData.length) return;
    const headers = ["Name", "Username", "Count", "Score", "Payload", "Created At", "Updated At"];
    const rows = filteredData.map(item => [
      item.name || "",
      item.username || "",
      item.count || "",
      item.score || "",
      typeof item.payload === 'object' ? JSON.stringify(item.payload) : (item.payload || ""),
      item.created_at || "",
      item.updated_at || ""
    ]);
    const csvContent = [headers, ...rows].map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_dashboard_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


const exportToExcel = () => {
  if (!filteredData.length) return;
  const worksheet = XLSX.utils.json_to_sheet(
    filteredData.map(item => ({
      "Name": item.name || "",
      "Username": item.username || "",
      "Count": item.count || "",
      "Score": item.score || "",
      "Payload": typeof item.payload === 'object' ? JSON.stringify(item.payload) : (item.payload || ""),
      "Created At": item.created_at ? new Date(item.created_at).toLocaleDateString() : "",
      "Updated At": item.updated_at ? new Date(item.updated_at).toLocaleDateString() : ""
    }))
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard");
  XLSX.writeFile(workbook, `admin_dashboard_${new Date().toISOString().slice(0,10)}.xlsx`);
};

  const { token, logout } = useContext(AdminAuthContext);
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
 
 
  useEffect(() => {
  const fetchData = async () => {
    try {
      let url = `/api/v1/superhero/admin/dashboard?filter=${filterType}`;
      if (filterType !== "all" && filterDate) url += `&date=${filterDate}`;
 
      const res = await fetch(url, { credentials: "include" }); // <— include cookies
      const data = await res.json();
      console.log("Fetched data:", data);
 
      if (res.ok) {
        setDashboardData(Array.isArray(data) ? data : data.items || []);
      } else {
        setError(data.message || "Failed to fetch dashboard data");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };
 
  fetchData();
}, [filterType, filterDate]);
const keyLabels = {
  id: "S.No.",
  name: "Name",
  username: "Email",
  count: "Total Attempts",
  score: "Score",
  payload: "Question & Answer",
  created_at: "Created At",
  updated_at: "Updated At"
  // Add more as needed
};
 
 
  // Filtering logic
  const getWeekStartEnd = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(d.setDate(diff));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };
 
  const filteredData = dashboardData.filter((item) => {
    const name = item?.name || "";
    // Use created_at or createdAt, fallback to Date.now()
    const createdAtRaw = item?.created_at || item?.createdAt || item?.creationDate || null;
    let createdAt = null;
    if (createdAtRaw) {
      // If already a Date, use it; if string, parse as date only
      createdAt = new Date(createdAtRaw);
    }
    let matches = name.toLowerCase().includes(searchQuery.toLowerCase());
 
    if (filterType === "day" && filterDate) {
      // Compare only the date part (YYYY-MM-DD)
      if (createdAt) {
        const createdDateStr = createdAt.toISOString().slice(0, 10); // 'YYYY-MM-DD'
        matches = matches && createdDateStr === filterDate;
      } else {
        matches = false;
      }
    } else if (filterType === "week") {
      if (createdAt) {
        const { start, end } = getWeekStartEnd(new Date());
        matches = matches && createdAt >= start && createdAt <= end;
      } else {
        matches = false;
      }
    } else if (filterType === "month") {
      if (createdAt) {
        const now = new Date();
        matches =
          matches &&
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear();
      } else {
        matches = false;
      }
    }
    return matches;
  });
 
  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  console.log("Current items:", currentItems);
 
  // Modal controls
  const openModal = (payload) => {
    setModalPayload(payload);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalPayload(null);
  };
 
  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
 
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-3">
        <LucideLayoutDashboard className="text-indigo-600" size={24} />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Aster Heroes — Campaign Dashboard</p>
        </div>
      </div>
        <div className="flex items-center gap-2 ml-auto">
          {/* // ...inside AdminDashboard.jsx header... */}

          <button
            onClick={() => navigate('/admin/dashboard/asterheros')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
          >
            Winners
          </button>

<button
  onClick={() => navigate('/admin/dashboard/users')}
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
>
  Users
</button>
          <button
            onClick={exportToCSV}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Export CSV
          </button>
          <button
  onClick={exportToExcel}
  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
>
  Export Excel
</button>
          
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
 
      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Search & Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4 border-b pb-4">
              <LucideSearch className="text-gray-500 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-700">Search & Filters</h2>
            </div>
 
            {/* Search input */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Search by Name..."
              />
              <LucideSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
 
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Filter by Period
                </label>
                <div className="flex space-x-2">
                  {["day", "week", "month"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                        filterType === type
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
 
              <div>
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="date-input"
                >
                  Specific Day
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date-input"
                    value={filterDate}
                    onChange={(e) => {
                      setFilterDate(e.target.value);
                      setFilterType("day");
                    }}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                  <LucideCalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
 
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterType("none");
                    setFilterDate("");
                    setSearchQuery("");
                  }}
                  className="w-full bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
 
          {/* Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4 border-b pb-4">
              <LucideTable className="text-gray-500 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-700">Data Table</h2>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      S.No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Payload
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.username || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.count || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.score || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openModal(item)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <LucideInfo size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
 
            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm text-gray-700">
                Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-semibold">
                  {Math.min(indexOfLastItem, filteredData.length)}
                </span>{" "}
                of <span className="font-semibold">{filteredData.length}</span> results
              </span>
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-2 rounded-l-md border bg-white text-sm font-medium text-gray-500 disabled:bg-gray-200"
                >
                  <LucideChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-2 rounded-r-md border bg-white text-sm font-medium text-gray-500 disabled:bg-gray-200"
                >
                  <LucideChevronRight size={16} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
 
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>
             {modalPayload && (
                <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-gray-700">
                  {Object.entries(modalPayload).map(([key, value]) => {
                    if (key === "payload") {
                      let payloadObj;
                      try {
                        payloadObj = typeof value === "string" ? JSON.parse(value) : value;
                      } catch {
                        payloadObj = {};
                      }
                      return (
                        <div key={key} className="mb-2">
                          <span className="font-bold">{keyLabels[key] || key}:</span>
                          <div className="ml-4">
                            {Object.entries(payloadObj).map(([pKey, pValue]) => (
                              <div key={pKey}>
                                <span className="font-semibold">{pKey}:</span>{" "}
                                {Array.isArray(pValue) ? pValue.join(", ") : String(pValue)}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    // Format date for created_at and updated_at
                    if (key === "created_at" || key === "updated_at") {
                      const formattedDate = value
                        ? new Date(value).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : "";
                      return (
                        <div key={key}>
                          <span className="font-bold">{keyLabels[key] || key}:</span>{" "}
                          <span>{formattedDate}</span>
                        </div>
                      );
                    }
                    return (
                      <div key={key}>
                        <span className="font-bold">{keyLabels[key] || key}:</span>{" "}
                        <span>{String(value)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
 
export default AdminDashboard;