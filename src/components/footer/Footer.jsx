
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-500 to-purple-600 text-white body-font shadow-inner transition-all duration-300">
      <div className="container px-5 py-6 mx-auto flex flex-col sm:flex-row items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center mb-4 sm:mb-0 hover:scale-105 transition-transform duration-300"
        >
          <span className="text-2xl font-bold tracking-wide text-white drop-shadow-lg animate-pulse">
            E-Digi Shop
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-sm text-gray-100 text-center sm:text-left">
          © 2025 E-Digi Shop —
          <Link
            to="/"
            className="text-gray-200 hover:text-white hover:underline transition-all duration-300 ml-1"
          >
            @edigishop
          </Link>
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 sm:mt-0 justify-center sm:justify-end">
          {/* Facebook */}
          <a
            href="#"
            className="hover:text-violet-300 transform hover:scale-110 transition-all duration-300"
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="#"
            className="hover:text-violet-300 transform hover:scale-110 transition-all duration-300"
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8.47v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="hover:text-violet-300 transform hover:scale-110 transition-all duration-300"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="#"
            className="hover:text-violet-300 transform hover:scale-110 transition-all duration-300"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx={4} cy={4} r={2} stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
