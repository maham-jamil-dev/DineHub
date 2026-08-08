import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

function ManageMenu() {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================
  // Get My Menu
  // ==========================

  const fetchMenu = async () => {
    try {

      const res = await API.get("/menu/my");

      setItems(res.data.menu || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchMenu();

  }, []);

  // ==========================
  // Search
  // ==========================

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ==========================
  // Delete Menu Item
  // ==========================

  const deleteItem = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/menu/delete/${id}`);

      toast.success("Menu Item Deleted Successfully");

      fetchMenu();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed To Delete Menu Item"
      );

    }
  };

  // ==========================
  // Edit Menu
  // ==========================

  const editMenu = (id) => {

    navigate(`/owner/menu/edit/${id}`);

  };
    return (
    <div className="animate-fade-in">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-display font-bold text-dark mb-2">
            Manage Menu
          </h1>

          <p className="text-gray-500">
            Add, edit or remove menu items
          </p>

        </div>

        <button
          onClick={() => navigate("/owner/menu/add")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </button>

      </div>

      <div className="card p-6">

        <div className="relative mb-6">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2
            h-5 w-5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-12"
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gradient-to-r from-gold/10 to-amber-50/40 border-b border-gray-100">

                <th className="px-6 py-4 text-left text-xs font-bold text-primary uppercase">
                  Item
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-primary uppercase">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-primary uppercase">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-primary uppercase">
                  Description
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold text-primary uppercase">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filtered.length > 0 ? (

                filtered.map((item) => (

                  <tr
                    key={item._id}
                    className="hover:bg-gold/[0.05] transition-colors"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        {item.image ? (

                          <img
                            src={`http://localhost:5000${item.image}`}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />

                        ) : (

                          <div className="w-12 h-12 rounded-lg bg-gray-200"></div>

                        )}

                        <span className="font-medium">
                          {item.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4">
                      {item.category}
                    </td>

                    <td className="px-6 py-4 font-bold text-primary">
                      Rs. {item.price}
                    </td>

                    <td className="px-6 py-4 max-w-xs truncate">
                      {item.description}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => editMenu(item._id)}
                          className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => deleteItem(item._id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-primary/10 text-primary transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No Menu Items Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageMenu;