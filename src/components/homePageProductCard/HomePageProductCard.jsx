import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { motion } from "framer-motion";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("🛒 Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast("🛒 Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="py-12 bg-gradient-to-br from-violet-100 via-white to-violet-50">
      <h1 className="text-center mb-10 text-3xl lg:text-4xl font-extrabold text-violet-800 tracking-wide">
         Bestselling Products
      </h1>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {Array.isArray(getAllProduct) &&
            getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              const isInCart = cartItems.some((p) => p.id === id);

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white/80 backdrop-blur-md border border-violet-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl"
                >
                  {/* Product Image with Hover Overlay */}
                  <div className="relative group">
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      src={productImageUrl}
                      alt={title}
                      className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center gap-3">
                      {isInCart ? (
                        <button
                          onClick={() => deleteCart(item)}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-md"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(item)}
                          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-md"
                        >
                          Add to Cart
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="bg-white text-violet-700 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-violet-100 transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 text-center">
                    <h2 className="text-xs text-violet-700 font-semibold mb-1 uppercase tracking-wide">
                      E-Digi Shop
                    </h2>
                    <h1 className="text-lg font-bold text-gray-800 truncate">
                      {title}
                    </h1>
                    <p className="text-xl font-extrabold text-violet-600 mt-1">
                      ₹ {price}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePageProductCard;
