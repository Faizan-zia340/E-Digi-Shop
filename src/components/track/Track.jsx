
import { motion } from "framer-motion";

const Track = () => {
  const items = [
    {
      title: "Premium T-Shirts",
      text: "Our T-Shirts are 100% made of cotton, offering comfort, quality, and durability.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      ),
    },
    {
      title: "Fast Delivery",
      text: "We ensure your orders are delivered safely and quickly to your doorstep.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h18l-1.5 9H4.5L3 3zm2.25 9.75h13.5L18 21H6l-.75-8.25z"
        />
      ),
    },
    {
      title: "Customer Support",
      text: "Our dedicated support team is available 24/7 to assist you anytime.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12a9.75 9.75 0 0119.5 0v1.5a2.25 2.25 0 01-2.25 2.25h-2.25l-.75 4.5h-9l-.75-4.5H4.5A2.25 2.25 0 012.25 13.5V12z"
        />
      ),
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-5 py-10 md:py-14">
        <div className="flex flex-wrap -m-4 text-center">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-4 md:w-1/3 sm:w-1/2 w-full"
            >
              <div className="border-2 border-gray-200 bg-gray-100 hover:shadow-2xl hover:shadow-violet-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-8 rounded-2xl transition-all duration-300">
                <svg
                  className="text-violet-600 w-12 h-12 mb-4 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  {item.icon}
                </svg>
                <h2 className="title-font font-semibold text-lg text-gray-900 mb-2">
                  {item.title}
                </h2>
                <p className="leading-relaxed text-gray-600 text-sm sm:text-base">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Track;
