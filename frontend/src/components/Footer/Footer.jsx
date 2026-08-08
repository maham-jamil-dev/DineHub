import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import {FaFacebook,FaInstagram,FaTiktok,FaYoutube,} from "react-icons/fa";
function Footer() {
    const socialLinks = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/profile.php?id=61592298215291",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/dine.hub6?igsh=MTFraTZwcTN4YW04bQ%3D%3D&utm_source=qr",
    },
    {
      icon: FaTiktok,
      link: "https://www.tiktok.com/@dine.hub8?_r=1&_t=ZS-98DQIBYYwzs",
    },
    {
      icon: FaYoutube,
      link: "https://www.youtube.com/@Dinehub-t8e",
    },
  ];
 

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Blog", path: "/blog" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];
  return (
    <footer className="bg-dark text-white relative">
      {/* Top Wave */}
      <div className="w-full overflow-hidden leading-none bg-transparent -mt-px">
        <svg viewBox="0 0 1440 64" fill="none" className="block w-full h-12 md:h-16" preserveAspectRatio="none">
          <path d="M0 64L48 58.7C96 53 192 43 288 37.3C384 32 480 32 576 37.3C672 43 768 53 864 53.3C960 53 1056 43 1152 37.3C1248 32 1344 32 1392 32L1440 32V64H1392C1344 64 1248 64 1152 64C1056 64 960 64 48 64H0Z" fill="#1A1A1A"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Dine Hub" className="h-14 w-14 object-contain" />
              <div>
                <span className="text-2xl font-display font-bold text-white">Dine</span>
                <span className="text-2xl font-display font-bold text-gold">Hub</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Feed Your Cravings. Discover the best restaurants, book tables, and order delicious food — all in one place.
            </p>
           <div className="flex gap-3">

              {socialLinks.map((item, index) => {

                const Icon = item.icon;

                return (

                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:scale-110 text-gray-400 hover:text-white transition-all duration-300"
                  >

                    <Icon className="h-5 w-5" />

                  </a>

                );

              })}

            </div>

          </div>


          {/* Quick Links */}
          
<div>
  <h3 className="text-lg font-display font-bold text-gold mb-4">
    Quick Links
  </h3>

  <ul className="space-y-3">
    {quickLinks.map((item) => (
      <li key={item.name}>
        <Link
          to={item.path}
          className="text-gray-400 hover:text-gold transition-colors text-sm"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* For Business */}
          <div>
            <h3 className="text-lg font-display font-bold text-gold mb-4">For Business</h3>
            <ul className="space-y-3">
  {[
    "Partner with Us",
    "Owner Dashboard",
    "Restaurant Management",
    "Analytics",
  ].map((item) => (
    <li
      key={item}
      className="text-gray-400 hover:text-gold transition-colors text-sm cursor-default"
    >
      {item}
    </li>
  ))}
</ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-bold text-gold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                Lahore, Pakistan
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                +92 300 1234567
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                dinehubofficial@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Dine Hub. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Developed By Esha & Maham
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer