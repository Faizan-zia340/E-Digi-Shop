

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Images import karo taake deploy me bhi properly load ho
import hero1 from "../pictures/herosection4.jpg";
import hero2 from "../pictures/herosection6.jpg";
import hero3 from "../pictures/herosection.jpg";
import hero4 from "../pictures/herosection5.jpg";

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const texts = [
    "Explore the latest in Fashion, Shirts, and Jackets — upgrade your wardrobe with style.",
    "Find top deals on Mobiles, Laptops, and smart gadgets — technology that fits your life.",
    "Step into comfort with our premium Shoes collection and elevate your daily look.",
    "Discover everything for your Home and Books that inspire — all in one smart place.",
    "Shop smarter with E-Digi Shop — Fashion, Electronics, Home, and more at your fingertips.",
  ];

  const images = [hero1, hero2, hero3, hero4];

  // Text slider
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts.length]);

  // Image slider
  useEffect(() => {
    const slide = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(slide);
  }, [images.length]);

  const handleScroll = () => {
    const section = document.getElementById("category");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-center bg-gray-50 px-6 lg:px-16 py-10 lg:py-20 overflow-hidden">
      {/* Left Side: Text */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col justify-center text-left"
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold text-violet-800 mb-4 leading-tight">
          Welcome to <span className="text-violet-600">E-Digi Shop</span>
        </h1>

        <motion.p
          key={textIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-700 text-base lg:text-lg mb-6"
        >
          {texts[textIndex]}
        </motion.p>

        <button
          onClick={handleScroll}
          className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded-lg w-max transition-all text-base font-medium shadow-md"
        >
          Shop Now
        </button>
      </motion.div>

      {/* Right Side: Image Slider */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
        <div className="relative w-full lg:w-[85%] h-[260px] lg:h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="E-Digi Shop"
              className="w-full h-full object-cover object-center"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
