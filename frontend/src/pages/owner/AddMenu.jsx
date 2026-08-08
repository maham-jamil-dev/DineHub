import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

function AddMenu() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",
    description: "",
    category: "",
    price: "",
    isAvailable: true

  });

  const [image, setImage] = useState(null);

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({

      ...formData,

      [name]: type === "checkbox" ? checked : value

    });

  };

  // ==========================
  // Handle Image
  // ==========================

  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };

  // ==========================
  // Submit Form
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (Number(formData.price) <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("isAvailable", formData.isAvailable);

      if (image) {

        data.append("image", image);

      }

      const res = await API.post(
        "/menu/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success(res.data.message || "Menu Item Added!");

      navigate("/owner/menu");

    }

    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed To Add Menu Item"
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
          Add Menu Item
        </h1>

        <p className="text-gray-500">
          Create a new menu item for your restaurant
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
              placeholder="Enter Item Name"
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
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter Description"
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
              placeholder="BBQ, Fast Food, Drinks..."
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
              placeholder="Enter Price"
              required
              className="input-field"
            />

          </div>

          {/* Image */}

          <div>

            <label className="block mb-2 font-medium">
              Menu Image
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
              {loading
                ? "Adding..."
                : "Add Menu Item"}
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

export default AddMenu;