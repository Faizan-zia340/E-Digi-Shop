import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-center bg-gray-50 px-5 lg:px-20 py-5 lg:py-8">
      
      {/* Left side: Text */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col justify-center lg:pr-12 text-left"
      >
        <h1 className="text-3xl lg:text-4xl font-extrabold text-violet-800 mb-3">
          Welcome to E-Digi Shop
        </h1>
        <p className="text-gray-700 text-base lg:text-lg mb-4">
          Discover premium products at amazing prices. Fashion, gadgets, home essentials, and more — all in one place.
        </p>
        <button className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-5 rounded-lg w-max transition-all text-sm lg:text-base">
          Shop Now
        </button>
      </motion.div>

      {/* Right side: Image */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex justify-center items-center mt-4 lg:mt-0"
      >
        <div className="w-full lg:w-[85%] h-[180px] lg:h-[280px] flex items-center justify-center bg-gray-100 rounded-xl shadow-lg overflow-hidden">
          <img
            src="src/components/pictures/herosection.jpg"
            alt="E-Digi Shop"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
