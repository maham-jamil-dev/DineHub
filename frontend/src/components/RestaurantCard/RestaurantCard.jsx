import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";

const IMAGE_URL = "http://localhost:5000";

function RestaurantCard({ restaurant }) {
  const image =
    restaurant.image && restaurant.image.startsWith("http")
      ? restaurant.image
      : `${IMAGE_URL}${restaurant.image || "/uploads/default.png"}`;

  return (
    <Link
      to={`/restaurant/${restaurant._id}`}
      className="card group block overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/logo.png";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />

          <span className="text-sm font-bold text-dark">
            {restaurant.rating || 0}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg">
            {restaurant.name}
          </h3>

          <p className="text-white/80 text-sm">
            {restaurant.cuisine}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">

          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {restaurant.location}
          </span>

          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-yellow-500" />
            {restaurant.timing || "N/A"}
          </span>

        </div>

        <div className="mt-3 flex items-center justify-between">

          <span className="text-primary font-bold">
            {restaurant.priceRange}
          </span>

          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
            {restaurant.status || "Open"}
          </span>

        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;