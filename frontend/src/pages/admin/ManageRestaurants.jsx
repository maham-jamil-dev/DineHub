import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import DataTable from "../../components/DataTable/DataTable";

function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/restaurants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const approveRestaurant = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/restaurant/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRestaurants();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRestaurant = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/restaurant/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRestaurants();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = restaurants.filter(
    (restaurant) =>
      restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      restaurant.owner?.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );
    const columns = [
    {
      key: "name",
      label: "Restaurant",
    },

    {
      key: "owner",
      label: "Owner",
      render: (row) => row.owner?.fullName,
    },

    {
      key: "location",
      label: "Location",
      render: (row) => row.location,
    },

    {
      key: "rating",
      label: "Rating",
      render: (row) =>
        row.rating ? (
          <span className="text-yellow-500 font-bold">
            ⭐ {row.rating}
          </span>
        ) : (
          "N/A"
        ),
    },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${
            row.status === "approved"
              ? "bg-green-100 text-green-700"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
  key: "actions",
  label: "Review",
  render: (row) => {
    if (row.status === "pending") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => approveRestaurant(row._id)}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm"
          >
            Approve
          </button>

          <button
            onClick={() => rejectRestaurant(row._id)}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
          >
            Reject
          </button>
        </div>
      );
    }

    return (
      <span className="text-gray-500 text-sm">
        No Action Required
      </span>
    );
  },
},
  ];

  return (
    <div className="animate-fade-in">

      <h1 className="text-3xl font-display font-bold text-dark mb-2">
        Manage Restaurants
      </h1>

      <p className="text-gray-500 mb-8">
        Approve and manage restaurant listings
      </p>

      <div className="card p-6 mb-6">

        <div className="relative max-w-md">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2
            h-5 w-5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search restaurants..."
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

export default ManageRestaurants;