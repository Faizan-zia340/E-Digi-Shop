
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

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to Cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from Cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              {/* Left: Product Image */}
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <img
                  className="w-full lg:h-[39em] rounded-xl shadow-lg"
                  src={product?.productImageUrl}
                  alt={product?.title}
                />
              </div>

              {/* Right: Product Details */}
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <h2 className="max-w-xl mb-6 text-2xl font-semibold leading-loose text-gray-800 dark:text-gray-200">
                    {product?.title}
                  </h2>

                  {/* Price */}
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Rs: {product?.price}
                  </p>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-300">
                      Description:
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {product?.description}
                    </p>
                  </div>

                  {/* Add/Delete Cart Buttons */}
                  <div className="mb-6">
                    {cartItems.some((p) => p.id === product.id) ? (
                      <button
                        onClick={() => deleteCart(product)}
                        className="w-full px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all duration-200 shadow-md"
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(product)}
                        className="w-full px-4 py-3 text-white bg-violet-600 hover:bg-violet-700 rounded-xl font-semibold transition-all duration-200 shadow-md"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>

                  {/* Buy Now Button */}
                  <button className="w-full px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
