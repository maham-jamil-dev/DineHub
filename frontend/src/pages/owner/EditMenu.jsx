import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

function EditMenu() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: ""
  });

  const [image, setImage] = useState(null);

  // ==========================
  // Load Menu Item
  // ==========================

  const fetchMenuItem = async () => {

    try {

      const res = await API.get("/menu/my");

      const menuItem = res.data.menu.find(
        (item) => item._id === id
      );

      if (!menuItem) {

        toast.error("Menu Item Not Found");

        navigate("/owner/menu");

        return;

      }

      setFormData({
        name: menuItem.name,
        description: menuItem.description,
        category: menuItem.category,
        price: menuItem.price
      });

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchMenuItem();

  }, []);

  // ==========================
  // Input Change
  // ==========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };

  // ==========================
  // Update Menu
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);

      if (image) {

        data.append("image", image);

      }

      const res = await API.put(

        `/menu/update/${id}`,

        data,

        {

          headers: {

            "Content-Type": "multipart/form-data"

          }

        }

      );

      toast.success(res.data.message || "Menu Item Updated Successfully!");

      navigate("/owner/menu");

    }

    catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Failed To Update Menu"

      );

    }

    finally {

      setLoading(false);

    }

  };
    return (

    <div className="animate-fade-in max-w-3xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-display font-bold text-dark mb-2">
          Edit Menu Item
        </h1>

        <p className="text-gray-500">
          Update your menu item details
        </p>

      </div>

      <div className="card p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Name */}

          <div>

            <label className="block mb-2 font-medium">
              Item Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="input-field"
            />

          </div>

          {/* Category */}

          <div>

            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-field"
            />

          </div>

          {/* Price */}

          <div>

            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input-field"
            />

          </div>

          {/* Image */}

          <div>

            <label className="block mb-2 font-medium">
              Change Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-field"
            />

          </div>

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Updating..." : "Update Menu Item"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/owner/menu")}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditMenu;