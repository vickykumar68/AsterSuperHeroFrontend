


// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import {
//   LucideLayoutDashboard,
//   LucideChevronLeft,
//   LucideChevronRight,
// } from "lucide-react";
// import { AdminAuthContext } from "../context/AdminAuthContext";

// const GetUser = () => {
//   const navigate = useNavigate();
//   const { logout } = useContext(AdminAuthContext);
//   const [users, setUsers] = useState([]);
//   const [usersTotal, setUsersTotal] = useState(0);
//   const [usersPage, setUsersPage] = useState(1);
//   const usersLimit = 10;
//   const [usersLoading, setUsersLoading] = useState(false);
//   const [usersError, setUsersError] = useState("");

//   useEffect(() => {
//     setUsersLoading(true);
//     axios.get("/api/admin/users", {
//       params: { page: usersPage, limit: usersLimit },
//       withCredentials: true
//     })
//       .then(res => {
//         setUsers(res.data.users || []);
//         setUsersTotal(res.data.total || 0);
//         setUsersError("");
//       })
//       .catch(() => setUsersError("Failed to fetch users"))
//       .finally(() => setUsersLoading(false));
//   }, [usersPage]);

//   // Export CSV logic
//   const exportToCSV = () => {
//     if (!users.length) return;
//     const headers = [
//       "Name", "Email", "Age Group", "Parent Name", "Contact", "Clinic", "Reference", "Consent", "Created At"
//     ];
//     const rows = users.map(user => [
//       user.name || "",
//       user.email || "",
//       user.age_group || "",
//       user.parent_name || "",
//       user.contact_number || "",
//       user.clinic_name || "",
//       user.reference_name || "",
//       user.consent ? "Yes" : "No",
//       user.created_at ? new Date(user.created_at).toLocaleDateString() : ""
//     ]);
//     const csvContent = [headers, ...rows].map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `users_${new Date().toISOString().slice(0,10)}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };


// const exportToExcel = () => {
//   if (!users.length) return;
//   const worksheet = XLSX.utils.json_to_sheet(
//     users.map(user => ({
//       "Name": user.name || "",
//       "Email": user.email || "",
//       "Age Group": user.age_group || "",
//       "Parent Name": user.parent_name || "",
//       "Contact": user.contact_number || "",
//       "Clinic": user.clinic_name || "",
//       "Reference": user.reference_name || "",
//       "Consent": user.consent ? "Yes" : "No",
//       "Created At": user.created_at ? new Date(user.created_at).toLocaleDateString() : ""
//     }))
//   );
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
//   XLSX.writeFile(workbook, `users_${new Date().toISOString().slice(0,10)}.xlsx`);
// };

//   return (
//     <div>
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 bg-white shadow-md">
//         <div className="flex items-center space-x-2">
//           <LucideLayoutDashboard className="text-indigo-600" size={24} />
//           <h1 className="text-2xl font-bold text-gray-800">Users</h1>
//         </div>
//         <div className="flex items-center gap-2 ml-auto">
//           <button
//             onClick={() => navigate('/admin/dashboard')}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           >
//             Dashboard
//           </button>
//           <button
//             onClick={exportToCSV}
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//           >
//             Export CSV
//           </button>
//           <button
//   onClick={exportToExcel}
//   className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
// >
//   Export Excel
// </button>
//           <button
//             onClick={() => {
//               logout();
//               navigate('/admin/login');
//             }}
//             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </header>
//       <div className="max-w-[90rem] mx-auto p-6">
//         {usersLoading ? (
//           <div>Loading users...</div>
//         ) : usersError ? (
//           <div className="text-red-500">{usersError}</div>
//         ) : (
//           <>
//             <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S.No.</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Age Group</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parent Name</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Clinic</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Consent</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {users.length > 0 ? users.map((user, idx) => (
//                     <tr key={user.id}>
//                       <td className="px-4 py-2">{(usersPage - 1) * usersLimit + idx + 1}</td>
//                       <td className="px-4 py-2">{user.name}</td>
//                       <td className="px-4 py-2">{user.email}</td>
//                       <td className="px-4 py-2">{user.age_group}</td>
//                       <td className="px-4 py-2">{user.parent_name}</td>
//                       <td className="px-4 py-2">{user.contact_number}</td>
//                       <td className="px-4 py-2">{user.clinic_name}</td>
//                       <td className="px-4 py-2">{user.reference_name}</td>
//                       <td className="px-4 py-2">{user.consent ? "Yes" : "No"}</td>
//                       <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
//                     </tr>
//                   )) : (
//                     <tr>
//                       <td colSpan="10" className="px-4 py-2 text-center text-gray-500">No users found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             {/* Pagination */}
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-700">
//                 Showing <span className="font-semibold">{(usersPage - 1) * usersLimit + 1}</span> to{" "}
//                 <span className="font-semibold">{Math.min(usersPage * usersLimit, usersTotal)}</span> of{" "}
//                 <span className="font-semibold">{usersTotal}</span> users
//               </span>
//               <nav className="inline-flex rounded-md shadow-sm">
//                 <button
//                   onClick={() => setUsersPage(p => p - 1)}
//                   disabled={usersPage === 1}
//                   className="px-2 py-2 rounded-l-md border bg-white text-sm font-medium text-gray-500 disabled:bg-gray-200"
//                 >
//                   <LucideChevronLeft size={16} />
//                 </button>
//                 {Array.from({ length: Math.ceil(usersTotal / usersLimit) }, (_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setUsersPage(i + 1)}
//                     className={`px-4 py-2 border text-sm font-medium ${
//                       usersPage === i + 1
//                         ? "bg-indigo-50 border-indigo-500 text-indigo-600"
//                         : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setUsersPage(p => p + 1)}
//                   disabled={usersPage * usersLimit >= usersTotal}
//                   className="px-2 py-2 rounded-r-md border bg-white text-sm font-medium text-gray-500 disabled:bg-gray-200"
//                 >
//                   <LucideChevronRight size={16} />
//                 </button>
//               </nav>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetUser;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import {
  LucideLayoutDashboard,
  LucideChevronLeft,
  LucideChevronRight,
  LucideSearch,
} from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuthContext";

const GetUser = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AdminAuthContext);
  const [users, setUsers] = useState([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersPage, setUsersPage] = useState(1);
  const usersLimit = 10;
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    setUsersLoading(true);
    axios.get("/api/v1/superhero/admin/users", {
      params: { page: usersPage, limit: usersLimit, search: searchEmail },
      withCredentials: true
    })
      .then(res => {
        setUsers(res.data.users || []);
        setUsersTotal(res.data.total || 0);
        setUsersError("");
      })
      .catch(() => setUsersError("Failed to fetch users"))
      .finally(() => setUsersLoading(false));
  }, [usersPage, searchEmail]);

  // Export CSV logic
  const exportToCSV = () => {
    if (!users.length) return;
    const headers = [
      "Name", "Email", "Age Group", "Parent Name", "Contact", "Clinic", "Reference", "Consent", "Created At"
    ];
    const rows = users.map(user => [
      user.name || "",
      user.email || "",
      user.age_group || "",
      user.parent_name || "",
      user.contact_number || "",
      user.clinic_name || "",
      user.reference_name || "",
      user.consent ? "Yes" : "No",
      user.created_at ? new Date(user.created_at).toLocaleDateString() : ""
    ]);
    const csvContent = [headers, ...rows].map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    if (!users.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      users.map(user => ({
        "Name": user.name || "",
        "Email": user.email || "",
        "Age Group": user.age_group || "",
        "Parent Name": user.parent_name || "",
        "Contact": user.contact_number || "",
        "Clinic": user.clinic_name || "",
        "Reference": user.reference_name || "",
        "Consent": user.consent ? "Yes" : "No",
        "Created At": user.created_at ? new Date(user.created_at).toLocaleDateString() : ""
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, `users_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchEmail("");
    setUsersPage(1);
  };

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-3">
          <LucideLayoutDashboard className="text-indigo-600" size={24} />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Aster Heroes — User Leaderboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => navigate('/admin/dashboard/asterheros')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
          >
            Winners
          </button>
          
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Dashboard
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
      <div className="max-w-[90rem] mx-auto p-6">
        {/* Search by Email */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchEmail}
              onChange={e => {
                setSearchEmail(e.target.value);
                setUsersPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Search by Name, Email..."
            />
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
        {usersLoading ? (
          <div>Loading users...</div>
        ) : usersError ? (
          <div className="text-red-500">{usersError}</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S.No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Age Group</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parent Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Clinic</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Consent</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? users.map((user, idx) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{(usersPage - 1) * usersLimit + idx + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.age_group}</td>
                      <td className="px-4 py-2">{user.parent_name}</td>
                      <td className="px-4 py-2">{user.contact_number}</td>
                      <td className="px-4 py-2">{user.clinic_name}</td>
                      <td className="px-4 py-2">{user.reference_name}</td>
                      <td className="px-4 py-2">{user.consent ? "Yes" : "No"}</td>
                      <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="10" className="px-4 py-2 text-center text-gray-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Showing <span className="font-semibold">{(usersPage - 1) * usersLimit + 1}</span> to{" "}
                <span className="font-semibold">{Math.min(usersPage * usersLimit, usersTotal)}</span> of{" "}
                <span className="font-semibold">{usersTotal}</span> users
              </span>
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setUsersPage(p => p - 1)}
                  disabled={usersPage === 1}
                  className="px-2 py-2 rounded-l-md border bg-white text-sm font-medium text-gray-500 disabled:bg-gray-200"
                >
                  <LucideChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.ceil(usersTotal / usersLimit) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setUsersPage(i + 1)}
                    className={`px-4 py-2 border text-sm font-medium ${
                      usersPage === i + 1
                        ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setUsersPage(p => p + 1)}
                  disabled={usersPage * usersLimit >= usersTotal}
                  className="px-2 py-2 rounded-r-md border bg-white text-sm font-medium text-gray-500 disabled:bg-gray-200"
                >
                  <LucideChevronRight size={16} />
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GetUser;