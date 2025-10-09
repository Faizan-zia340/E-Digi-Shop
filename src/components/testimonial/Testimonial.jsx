
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        {/* main */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading */}
          <h1 className="text-center text-3xl font-bold text-black">
            Testimonial
          </h1>
          <h2 className="text-center text-2xl font-semibold mb-10">
            What our <span className="text-violet-500">customers</span> are saying
          </h2>

          <div className="flex flex-wrap -m-4">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="lg:w-1/3 lg:mb-0 mb-6 p-4"
            >
              <div className="h-full text-center rounded-2xl shadow-md p-6 bg-white border border-gray-100 hover:shadow-lg transition-all">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-4 border-violet-500 bg-gray-100 shadow-sm"
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                />
                <p className="leading-relaxed text-gray-600">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Kamal Nayan Upadhyay
                </h2>
                <p className="text-gray-500">Senior Product Designer</p>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="lg:w-1/3 lg:mb-0 mb-6 p-4"
            >
              <div className="h-full text-center rounded-2xl shadow-md p-6 bg-white border border-gray-100 hover:shadow-lg transition-all">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-4 border-violet-500 bg-gray-100 shadow-sm"
                  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRnJbf6AKUkKb4rskncNv4pgcaL-J1xjUm8_yEDdkblD6BIYWbi"
                />
                <p className="leading-relaxed text-gray-600">
                  Loved the quality and service! The shopping experience was
                  smooth and fast. I highly recommend this store to everyone
                  looking for reliable online products.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  S Mishra
                </h2>
                <p className="text-gray-500">UI Developer</p>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="lg:w-1/3 lg:mb-0 mb-6 p-4"
            >
              <div className="h-full text-center rounded-2xl shadow-md p-6 bg-white border border-gray-100 hover:shadow-lg transition-all">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-4 border-violet-500 bg-gray-100 shadow-sm"
                  src="src\components\pictures\608e5cb4-6654-4673-8477-2e37b6637193.jpg"
                />
                <p className="leading-relaxed text-gray-600">
                  From checkout to delivery, everything was seamless. The
                  products are exactly as described and customer support is
                  amazing!
                </p>
                <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  starlet
                </h2>
                <p className="text-gray-500">CTO</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
