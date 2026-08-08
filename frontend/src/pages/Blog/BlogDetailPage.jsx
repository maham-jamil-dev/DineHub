import React from "react";
import { Calendar, User, Clock } from "lucide-react";

import BlogImage from "../../assets/blogs/lahore-street-food.jpg";
function BlogDetailPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Image */}

      <div className="w-full h-[500px] overflow-hidden">
        <img
          src={BlogImage}
          alt="Best Street Food in Lahore"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg px-8 py-12 -mt-16 relative z-10">

        <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
          Food Guide
        </span>

        <h1 className="text-5xl font-bold mt-6 mb-6 text-gray-900">
          Best Street Food in Lahore
        </h1>

        <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-10">

          <div className="flex items-center gap-2">
            <User size={18} />
            DineHub
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            July 2026
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} />
            8 min read
          </div>

        </div>

        <div className="space-y-6 text-gray-700 leading-8">

          <p>
            Lahore isn't just a city. It's a love affair with food. That love affair begins the moment you step onto its bustling streets. Smoky seekh kebabs sizzle on one corner. Sweet, syrupy jalebi comes fresh off the pan on the next.
          </p>

          <p>
            This city has earned its reputation as Pakistan's undisputed food capital. Are you planning to explore Lahore's street food scene? Or are you a local looking to rediscover old favorites? Either way, this DineHub guide covers the must-try spots that define what it means to eat like a true Lahori.
          </p>

          <h2 className="text-3xl font-bold text-black">
            Why Lahore's Street Food Culture is Unmatched
          </h2>

          <p>
            Every city has its street food. Lahore's version is different. Generations have passed down this food culture, and vendors have perfected it on the same corners for decades.
          </p>

          <p>
            Walk through the Walled City, Gawalmandi, or Ichhra. You'll quickly notice something: the vendors aren't just selling food. They're preserving a legacy. Many recipes here haven't changed in fifty years. That's exactly the point.
          </p>

          <h2 className="text-3xl font-bold text-black">
            Where to Start: The Walled City
          </h2>

          <p>
            No street food journey in Lahore is complete without a trip to the Walled City. The narrow alleys around Delhi Gate and Fort Road Food Street hold the real magic.
          </p>

          <h3 className="text-2xl font-semibold text-black">
            Phajja Siri Paye
          </h3>

          <p>
            A Lahore institution. This humble spot has served trotters and brain curry for generations. Long queues form at 3 AM, and that alone proves it's worth the hype.
          </p>

          <h3 className="text-2xl font-semibold text-black">
            Taj Mahal Chargha
          </h3>

          <p>
            Cooks deep-fried, whole-roasted chicken here to a crisp, golden finish. Locals consider it the stuff of legend. Pair it with naan and mint chutney for the full experience.
          </p>

          <h3 className="text-2xl font-semibold text-black">
            Fort Road Food Street
          </h3>

          <p>
            This entire street is dedicated to food, with a view of the Badshahi Mosque as your backdrop. It's touristy, yes. But the ambience alone makes it worth a visit at least once.
          </p>

          <h3 className="text-2xl font-semibold text-black">
            Haji Nihari
          </h3>

          <p>
            Another Walled City legend. This spot specializes in nihari so tender it practically falls apart before your spoon even touches it. Locals debate endlessly over which nihari spot wins. Honestly, that argument is half the fun of eating here.
          </p>
                  <div className="space-y-6 text-gray-700 leading-8 mt-10">

          <h2 className="text-3xl font-bold text-gray-900">
            Exploring Beyond the Old City
          </h2>

          <p>
            The Walled City and Gawalmandi get most of the attention. But
            Lahore's newer neighborhoods have built their own street food
            identity, and it's worth exploring.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900">
            Ichhra Bazaar
          </h3>

          <p>
            This market area is known for affordable eats. Its chaat and fruit
            chaat stalls draw shoppers taking a break from bargaining.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900">
            Liberty Market
          </h3>

          <p>
            Skip the shopping for a moment and check the surrounding food carts.
            They serve some of the city's best barbecue skewers, especially in
            the evenings when the market comes alive.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900">
            MM Alam Road
          </h3>

          <p>
            Upscale restaurants dominate here, but don't overlook the street
            corners. They host excellent chaat and juice vendors that cater to
            the after-shopping crowd.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10">
            7 Snacks That Are A Must Try
          </h2>

          <ul className="list-disc pl-8 space-y-3">
            <li><strong>Gol Gappay:</strong> Crispy shells filled with spicy, tangy water.</li>
            <li><strong>Dahi Bhalay:</strong> Soft lentil dumplings soaked in yogurt with tamarind chutney.</li>
            <li><strong>Samosas & Pakoray:</strong> Best enjoyed with a hot cup of chai.</li>
            <li><strong>Ice Gola:</strong> Shaved ice soaked in colorful syrups.</li>
            <li><strong>Chana Chaat:</strong> Tangy chickpea salad full of flavor.</li>
            <li><strong>Fruit Chaat:</strong> Seasonal fruits tossed with chaat masala.</li>
            <li><strong>Aloo Chaat:</strong> Crispy potatoes mixed with chutneys and spices.</li>
          </ul>

          <p>
            These snacks do more than fill a gap between meals. They're part of
            the daily rhythm of the city. Office workers grab gol gappay on
            their lunch break. Students crowd around dahi bhalay carts after
            school. Families make an evening ritual out of walking to the
            nearest chaat stall.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10">
            The Best Time to Explore Lahore's Street Food
          </h2>

          <p>
            Timing can make or break your street food experience in Lahore.
            Evenings bring the city's food scene to life, especially after
            sunset. Vendors set up in full force, and the energy on the streets
            peaks.
          </p>

          <p>
            During Ramazan, the atmosphere shifts entirely. Iftar stalls pop up
            across the city, offering samosas, pakoras and fruit chaat. Winter
            months bring their own specialties too. Hot Nihari and Paye become
            popular comfort food against the cold.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10">
            The Sweet Finish
          </h2>

          <p>
            No food journey in Lahore ends without dessert. Try Jalebi from
            Nasir's in Gawalmandi, where cooks still make it fresh in giant
            karahis. It's a rite of passage. For something richer, try Kheer or
            Gajar Ka Halwa from the sweet shops along MM Alam Road or Liberty
            Market.
          </p>

          <p>
            Other sweet staples deserve your attention too. Ras Malai offers
            soft cheese dumplings soaked in sweetened milk. Falooda layers
            vermicelli, jelly and ice cream into a dessert drink that's
            especially popular during the summer heat.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10">
            4 Tips Before You Go
          </h2>

          <ol className="list-decimal pl-8 space-y-3">
            <li>Go where the locals go. Crowded stalls usually mean fresh food.</li>
            <li>Visit iconic spots late at night or early in the morning.</li>
            <li>Start small because portions add up quickly.</li>
            <li>Carry cash since many vendors don't accept cards.</li>
          </ol>

          <h2 className="text-3xl font-bold text-gray-900 mt-10">
            Final Thoughts
          </h2>

          <p>
            Lahore's street food scene is more than a collection of dishes.
            It's a living, breathing part of the city's identity. Whether
            you're chasing the perfect Nihari, hunting down the crispiest
            Chargha, or simply enjoying Gol Gappay with friends, every bite
            tells a story that's uniquely Lahori.
          </p>

          <p>
            Did we miss your favorite street food spot in Lahore? Share it in
            the comments below. We're always looking to expand our list of
            hidden gems.
          </p>

          <hr className="my-10" />

          <h2 className="text-3xl font-bold text-gray-900">
            FAQs
          </h2>

          <div className="space-y-8 mt-6">

            <div>
              <h3 className="text-xl font-semibold">
                What is Lahore famous for in street food?
              </h3>

              <p>
                Lahore is famous for Nihari, Siri Paye, Chargha, Gol Gappay,
                Jalebi and many other traditional dishes. The Walled City and
                Gawalmandi are among the best places to experience them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Which area in Lahore has the best street food?
              </h3>

              <p>
                The Walled City, especially around Delhi Gate and Fort Road Food
                Street, offers the widest variety. Gawalmandi remains famous for
                Nihari, while Liberty Market and Ichhra Bazaar are great for
                Chaat and snacks.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                What is the best time to visit Lahore's food streets?
              </h3>

              <p>
                Evenings after sunset are ideal because most food vendors become
                active and the atmosphere is at its peak.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Is Lahore's street food safe to eat?
              </h3>

              <p>
                Busy stalls with high customer turnover are generally the safest
                choice because fresh food is prepared continuously.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                How much does street food in Lahore typically cost?
              </h3>

              <p>
                Street food is very affordable compared to restaurants. Prices
                vary depending on the vendor and location.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                What should first-time visitors try?
              </h3>

              <p>
                Start with Gol Gappay, Chargha and Jalebi. These dishes are
                iconic, easy to find, and perfectly represent Lahore's food
                culture.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
    </div>
  );
}

export default BlogDetailPage;