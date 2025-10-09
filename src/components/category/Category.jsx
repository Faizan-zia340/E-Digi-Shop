import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";

const category = [
  { id: 1, image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png", name: "Fashion" },
  { id: 2, image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png", name: "Shirt" },
  { id: 3, image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png", name: "Jacket" },
  { id: 4, image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png", name: "Mobile" },
  { id: 5, image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png", name: "Laptop" },
  { id: 6, image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png", name: "Shoes" },
  { id: 7, image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png", name: "Home" },
  { id: 8, image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png", name: "Books" },
];

const CategoryCards = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    if (value) navigate(`/category/${value.toLowerCase()}`);
  };

  return (
    <section id="category" className="w-full py-6 bg-gray-50 px-4 lg:px-0">
      {/* --- Mobile Dropdown --- */}
      <div className="block lg:hidden mb-4">
        <select
          value={selectedCategory}
          onChange={handleDropdownChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select Category</option>
          {category.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* --- Desktop / Large screen --- */}
      <div className="hidden lg:flex gap-4 overflow-x-scroll hide-scroll-bar justify-between w-full lg:w-11/12 mx-auto">
        {category.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center bg-white shadow-md rounded-lg border border-gray-200 p-4 w-24 h-36 cursor-pointer"
            onClick={() => navigate(`/category/${item.name.toLowerCase()}`)}
          >
            <div className="bg-violet-500 rounded-full w-16 h-16 flex items-center justify-center hover:bg-violet-400 transition-all">
              <img src={item.image} alt={item.name} className="w-12 h-12" />
            </div>
            <h3 className="mt-2 text-center text-xs font-medium text-gray-700 capitalize">
              {item.name}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* --- Hide Scrollbar --- */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scroll-bar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .hide-scroll-bar::-webkit-scrollbar {
              display: none;
            }
          `,
        }}
      />
    </section>
  );
};

export default CategoryCards;
