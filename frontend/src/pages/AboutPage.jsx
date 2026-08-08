function AboutPage() {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#A81818] via-primary to-[#7A0000] text-white py-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 font-display">
            About Dine Hub
          </h1>

          <p className="text-lg text-white/90 max-w-3xl mx-auto font-light">
            Connecting food lovers with amazing restaurants through one smart,
            modern and user-friendly platform.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-primary mb-6">
            Our Story
          </h2>

          <p className="text-gray-600 leading-8">
            DineHub started with a real-life problem that our team experienced every day.
During our office routine, we only had a 45-minute lunch break. Whenever we went out to eat, we spent a lot of time finding a restaurant, waiting for a table, browsing the menu, and placing our order. By the time we returned to the office, we were often late—and yes, we even got scolded by our HR. <br />
That everyday frustration made us think: What if people could reserve a table, explore the menu, and even place their order before reaching the restaurant?
This simple idea became the foundation of DineHub.
          </p>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600">
              Our mission is to eliminate unnecessary waiting time by providing a smart platform where customers can explore restaurants, reserve tables, and place orders in advance, while helping restaurant owners streamline their operations and deliver a better customer experience.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Our Vision
            </h3>

            <p className="text-gray-600">
              To make dining simple, fast, and enjoyable for everyone through smart technology.
            </p>
          </div>

        </div>
      </section>
      {/* Statistics */}

<section className="py-16 bg-gradient-to-r from-[#7A0000] via-primary to-[#A81818] text-white shadow-inner relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-black/20 pointer-events-none" />
  <div className="max-w-6xl mx-auto px-6 relative z-10">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

      <div>
        <h2 className="text-4xl font-bold font-display">500+</h2>
        <p className="mt-2 text-white/90 font-light">Restaurants</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold font-display">10K+</h2>
        <p className="mt-2 text-white/90 font-light">Customers</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold font-display">25K+</h2>
        <p className="mt-2 text-white/90 font-light">Orders</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold font-display">4.8 ★</h2>
        <p className="mt-2 text-white/90 font-light">Average Rating</p>
      </div>

    </div>

  </div>

</section>

      {/* Why Choose Us */}
      <section className="py-16">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-10 text-primary">
            Why Choose Dine Hub?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-bold text-xl mb-3">
                Easy Reservations
              </h3>
              <p className="text-gray-600">
                Book tables in just a few clicks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-bold text-xl mb-3">
                Smart Restaurant Management
              </h3>
              <p className="text-gray-600">
                Restaurant owners can manage menus, orders and analytics easily.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-bold text-xl mb-3">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Reliable and user-friendly experience for everyone.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AboutPage;