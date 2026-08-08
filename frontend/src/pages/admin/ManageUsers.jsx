import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import DataTable from "../../components/DataTable/DataTable";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = users.filter(
    (user) =>
      user.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "fullName",
      label: "Name",
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${
            row.role === "owner"
              ? "bg-yellow-100 text-yellow-700"
              : row.role === "admin"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {row.role}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Joined",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="animate-fade-in">

      <h1 className="text-3xl font-display font-bold text-dark mb-2">
        Manage Users
      </h1>

      <p className="text-gray-500 mb-8">
        View and manage all Dine Hub users
      </p>

      <div className="card p-6 mb-6">

        <div className="relative max-w-md">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2
            h-5 w-5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-12"
          />

        </div>

      </div>

      <DataTable
        columns={columns}
        data={filtered}
      />

    </div>
  );
}

export default ManageUsers;