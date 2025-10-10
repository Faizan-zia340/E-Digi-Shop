import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const { id } = useParams();

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product details");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-violet-50 font-poppins overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-violet-100"
          >
            {/* Product Image */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2 w-full relative group"
            >
              <img
                src={product?.productImageUrl}
                alt={product?.title}
                className="w-full h-[30rem] object-cover md:rounded-l-3xl group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:w-1/2 w-full p-8 flex flex-col justify-center bg-white/90"
            >
              <h2 className="text-3xl font-bold text-violet-700 mb-2">
                {product?.title}
              </h2>
              <p className="text-gray-600 mb-4 text-sm uppercase tracking-wide">
                E-Digi Shop Exclusive
              </p>
              <p className="text-2xl font-extrabold text-violet-600 mb-6">
                Rs : {product?.price}
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product?.description || "No description available."}
              </p>

              {cartItems.some((p) => p.id === product.id) ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteCart(product)}
                  className="w-full py-3 rounded-full text-white font-semibold bg-red-500 hover:bg-red-600 transition-all shadow-md"
                >
                  Remove from Cart
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addCart(product)}
                  className="w-full py-3 rounded-full text-white font-semibold bg-violet-600 hover:bg-violet-700 transition-all shadow-md"
                >
                  Add to Cart
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
