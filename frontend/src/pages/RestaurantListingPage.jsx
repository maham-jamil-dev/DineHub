import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import { getRestaurants } from "../api/api";
import { useSearchParams } from "react-router-dom";
const cuisines = [
  "All",
  "Pakistani",
  "BBQ",
  "Fast Food",
  "Chinese",
  "Italian",
  "Continental",
];

const sortOptions = [
  "Recommended",
  "Rating",
  "Price: Low to High",
  "Price: High to Low",
];

function RestaurantListingPage() {
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("Recommended");

  const [locations, setLocations] = useState(["All"]);

  useEffect(() => {
  fetchRestaurants();
}, []);

useEffect(() => {
  const query = searchParams.get("search");

  if (query) {
    setSearch(query);
  }
}, [searchParams]);

  const fetchRestaurants = async () => {
    try {
      const res = await getRestaurants();

      const data = res.data.restaurants || [];

      setRestaurants(data);
      setFiltered(data);

      const cities = [
        "All",
        ...new Set(data.map((item) => item.location).filter(Boolean)),
      ];

      setLocations(cities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let data = [...restaurants];

    if (search) {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.cuisine.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cuisine !== "All") {
      data = data.filter((item) => item.cuisine === cuisine);
    }

    if (location !== "All") {
      data = data.filter((item) => item.location === location);
    }

    if (sort === "Rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "Price: Low to High") {
      data.sort((a, b) =>
        (a.priceRange || "").length - (b.priceRange || "").length
      );
    }

    if (sort === "Price: High to Low") {
      data.sort((a, b) =>
        (b.priceRange || "").length - (a.priceRange || "").length
      );
    }

    setFiltered(data);
  }, [restaurants, search, cuisine, location, sort]);

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-dark mb-3">
            Discover Restaurants
          </h1>

          <p className="text-gray-500">
            Find your favourite restaurants.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border"
              />
            </div>

            <div className="flex flex-wrap gap-3">

              <FilterDropdown
                label="Cuisine"
                options={cuisines}
                value={cuisine}
                onChange={setCuisine}
              />

              <FilterDropdown
                label="Location"
                options={locations}
                value={location}
                onChange={setLocation}
              />

              <FilterDropdown
                label="Sort"
                options={sortOptions}
                value={sort}
                onChange={setSort}
              />

            </div>
          </div>
        </div>

        <div className="mb-6">
          <p>
            <strong>{filtered.length}</strong> Restaurants Found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

export default RestaurantListingPage;