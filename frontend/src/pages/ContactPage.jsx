import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      <section className="bg-gradient-to-r from-[#A81818] via-primary to-[#7A0000] text-white py-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">

          <h1 className="text-5xl font-bold font-display">
            Contact Us
          </h1>

          <p className="mt-4 text-lg text-white/90 font-light">
            We'd love to hear from you.
          </p>

        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">

        {/* Contact Info */}

        <div>

          <h2 className="text-3xl font-bold text-primary mb-8">
            Get In Touch
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <MapPin className="text-primary" />
              <span>Lahore, Pakistan</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-primary" />
              <span>+92 300 1234567</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-primary" />
              <span> dinehubofficial@gmail.com</span>
            </div>

          </div>

        </div>

        {/* Contact Form */}

        <form className="bg-white p-8 rounded-2xl shadow-lg space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border rounded-xl p-3"
          ></textarea>

          <button className="bg-primary text-white px-8 py-3 rounded-xl hover:opacity-90 transition">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}

export default ContactPage;