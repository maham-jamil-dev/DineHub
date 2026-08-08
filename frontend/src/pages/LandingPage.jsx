import { useEffect, useState } from "react";
import { getRestaurants } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  ChefHat,
  Calendar,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import RestaurantCard from "../components/RestaurantCard/RestaurantCard";

const heroSlides = [
  {
    id: 1,
    title: "Feed Your",
    highlight: "Cravings",
    desc: "Discover top-rated restaurants, reserve tables, and enjoy delicious meals with Dine Hub.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Reserve Tables",
    highlight: "Effortlessly",
    desc: "Skip the waiting line. Book your favorite dining spot in advance with zero hassle.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Gourmet Meals",
    highlight: "Delivered Fast",
    desc: "Order exquisite dishes directly from top local chefs right to your doorstep.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80",
  },
];

const features = [
  {
    icon: Search,
    title: "Discover",
    desc: "Find restaurants near you",
  },
  {
    icon: Calendar,
    title: "Reserve",
    desc: "Book tables easily",
  },
  {
    icon: ChefHat,
    title: "Order",
    desc: "Order delicious food",
  },
  {
    icon: Truck,
    title: "Track",
    desc: "Track your order live",
  },
];

const reviews = [
  {
    id: 1,
    name: "Ali Hamza",
    rating: 5,
    review:
      "Amazing platform! I reserved a table and ordered food from the same restaurant without switching apps.",
  },
  {
    id: 2,
    name: "Mishal Khan",
    rating: 5,
    review:
      "Very clean interface. Restaurant booking and food ordering together is exactly what I needed.",
  },
  {
    id: 3,
    name: "Ahmed Raza",
    rating: 5,
    review:
      "Loved the experience. Reservation was quick and ordering food was even easier.",
  },
  {
    id: 4,
    name: "Sara Noor",
    rating: 5,
    review:
      "Finally a platform where table reservation and online food ordering are available together.",
  },
  {
    id: 5,
    name: "Usman Ali",
    rating: 5,
    review:
      "Highly recommended! Fast, simple and beautifully designed. My favorite food platform.",
  },
];

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/restaurants?search=${searchQuery}`);
  };

  const fetchRestaurants = async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data.restaurants || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative min-h-[620px] flex items-center justify-center overflow-hidden transition-all duration-700">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
          </div>
        ))}

        {/* Carousel Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-20 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-all cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 z-20 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-all cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-5 leading-tight transition-all">
            {heroSlides[currentSlide].title}{" "}
            <span className="text-gold">{heroSlides[currentSlide].highlight}</span>
          </h1>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            {heroSlides[currentSlide].desc}
          </p>

          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center gap-2 border border-white/20 shadow-2xl">
            <Search className="text-white ml-3 h-5 w-5" />

            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="flex-1 bg-transparent outline-none text-white placeholder-white/70 px-2 py-3"
            />

            <button
              onClick={handleSearch}
              className="btn-gold whitespace-nowrap px-6 py-3 cursor-pointer"
            >
              Find Food
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? "w-8 bg-gold" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-3xl border border-gray-100/80 bg-white hover:bg-gradient-to-b hover:from-white hover:to-amber-50/50 hover:border-gold/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 transform group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 group-hover:bg-primary transition-all duration-300 shadow-sm">
                  <feature.icon className="text-primary group-hover:text-white h-7 w-7 transition-colors" />
                </div>

                <h3 className="font-bold mb-2 text-dark">
                  {feature.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}

      <section className="py-16 bg-cream">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex justify-between items-end mb-8">

            <div>

              <h2 className="text-3xl font-display font-bold text-dark mb-2">
                Featured Restaurants
              </h2>

              <p className="text-gray-500">
                Discover the most popular restaurants near you.
              </p>

            </div>

            <Link
              to="/restaurants"
              className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredRestaurants.length > 0 ? (

              filteredRestaurants.slice(0, 4).map((restaurant) => (

                  <RestaurantCard
                    key={restaurant._id}
                    restaurant={restaurant}
                  />

                ))

            ) : (

              <p className="text-gray-500 col-span-4 text-center">
                No restaurants available.
              </p>

            )}

          </div>

        </div>

      </section>
            {/* Customer Reviews */}

      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-display font-bold text-dark mb-3">
              What Our Customers Say
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto">
              Thousands of food lovers trust Dine Hub for restaurant
              reservations and online food ordering.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {reviews.map((review) => (

             <div
  key={review.id}
  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition duration-300 flex flex-col h-full"
>

                <div className="flex items-center mb-4">

                  {[...Array(review.rating)].map((_, index) => (

                    <span
                      key={index}
                      className="text-yellow-400 text-xl"
                    >
                      ★
                    </span>

                  ))}

                </div>

                <p className="text-gray-600 leading-7 italic flex-1">
  "{review.review}"
</p>

                <div className="border-t pt-4 mt-6">

                  <h4 className="font-semibold text-dark">
                    {review.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    Verified Customer
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
            {/* CTA */}

      <section className="py-20 bg-gradient-to-r from-[#A81818] via-primary to-[#7A0000] text-white relative overflow-hidden shadow-2xl">
        {/* Subtle depth overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center px-4 relative z-10">

          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to Dine?
          </h2>

          <p className="text-white/90 text-lg mb-8 font-light">
            Join thousands of food lovers and restaurant owners on Dine Hub.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/register"
              className="btn-gold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all"
            >
              Get Started
            </Link>

            <Link
              to="/restaurants"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-semibold"
            >
              Explore Restaurants
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default LandingPage;