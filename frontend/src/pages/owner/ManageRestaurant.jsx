import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  Upload,
  Save,
  MapPin,
  Phone,
} from "lucide-react";

import {
  getMyRestaurant,
  createRestaurant,
  updateRestaurant,
} from "../../api/api";

function ManageRestaurant() {
  const fileInputRef = useRef();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [restaurantExists, setRestaurantExists] = useState(false);

 const [formData, setFormData] = useState({
  name: "",
  cuisine: "",
  location: "",
  phone: "",
  email: "",
  timing: "",
  description: "",
  priceRange: "$$",
  averagePrice: "",
});

  // ==========================
  // Fetch Restaurant
  // ==========================

 const fetchRestaurant = async () => {
  setPreview("");

  try {
    const res = await getMyRestaurant();

      const restaurant = res.data.restaurant;

      setRestaurantExists(true);

      setFormData({
        name: restaurant.name || "",
        cuisine: restaurant.cuisine || "",
        location: restaurant.location || "",
        phone: restaurant.phone || "",
        email: restaurant.email || "",
        timing: restaurant.timing || "",
        description: restaurant.description || "",
        priceRange: restaurant.priceRange || "$$",
        averagePrice: restaurant.averagePrice || "",
      });

      if (restaurant.image) {
        setPreview(`http://localhost:5000${restaurant.image}`);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setRestaurantExists(false);
        setPreview("");

setFormData({
  name: "",
  cuisine: "",
  location: "",
  phone: "",
  email: "",
  timing: "",
  description: "",
  priceRange: "$$",
  averagePrice: "",
});
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Handle Image
  // ==========================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

    // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("cuisine", formData.cuisine);
      data.append("location", formData.location);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("timing", formData.timing);
      data.append("description", formData.description);
      data.append("priceRange", formData.priceRange);
      data.append("averagePrice", formData.averagePrice);

      if (image) {
        data.append("image", image);
      }

      let res;

      if (restaurantExists) {
        res = await updateRestaurant(data);
      } else {
        res = await createRestaurant(data);
      }

      toast.success(res.data.message || "Restaurant details saved successfully!");

      fetchRestaurant();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed To Save Restaurant"
      );
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="animate-fade-in">

      <h1 className="text-3xl font-display font-bold text-dark mb-2">
        {restaurantExists ? "Manage Restaurant" : "Create Restaurant"}
      </h1>

      <p className="text-gray-500 mb-8">
        {restaurantExists
          ? "Update your restaurant information"
          : "Create your restaurant"}
      </p>

      <form
        onSubmit={handleSubmit}
        className="card p-8 space-y-6 max-w-3xl"
      >

        {/* Image */}

        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full h-60 rounded-2xl border-2 border-dashed border-primary/30 cursor-pointer flex items-center justify-center overflow-hidden hover:border-primary transition"
        >

          {preview ? (

            <img
              src={preview}
              alt="Restaurant"
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="text-center">

              <Upload className="h-10 w-10 text-primary mx-auto mb-3" />

              <p>Click To Upload Restaurant Image</p>

            </div>

          )}

        </div>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Restaurant Name */}

        <div>

          <label className="block mb-2 font-medium">
            Restaurant Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />

        </div>

        {/* Cuisine */}

        <div>

          <label className="block mb-2 font-medium">
            Cuisine
          </label>

          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="input-field"
          />

        </div>

        {/* Location */}

        <div>

          <label className="block mb-2 font-medium">
            Location
          </label>

          <div className="relative">

            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field pl-10"
            />

          </div>

        </div>

        {/* Phone */}

        <div>

          <label className="block mb-2 font-medium">
            Phone
          </label>

          <div className="relative">

            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field pl-10"
            />

          </div>
    

        </div>
        <div>

  <label className="block mb-2 font-medium">
    Email
  </label>

  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="restaurant@gmail.com"
    className="input-field"
  />

</div>

        {/* Timing */}

        <div>

          <label className="block mb-2 font-medium">
            Timing
          </label>

          <input
            type="text"
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            className="input-field"
          />

        </div>

        {/* Price Range */}

        <div>

          <label className="block mb-2 font-medium">
            Price Range
          </label>

          <select
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
            className="input-field"
          >
            <option value="$">$ Budget</option>
            <option value="$$">$$ Standard</option>
            <option value="$$$">$$$ Premium</option>
            <option value="$$$$">$$$$ Luxury</option>
          </select>

        </div>

        {/* Average Price */}

        <div>

          <label className="block mb-2 font-medium">
            Average Price (Rs)
          </label>

          <input
            type="number"
            name="averagePrice"
            value={formData.averagePrice}
            onChange={handleChange}
            placeholder="1500"
            className="input-field"
          />

        </div>

        {/* Description */}

        <div>

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >

          <Save className="h-5 w-5" />

          {loading
            ? (restaurantExists ? "Updating..." : "Creating...")
            : (restaurantExists ? "Update Restaurant" : "Create Restaurant")}

        </button>

      </form>

    </div>

  );

}

export default ManageRestaurant;