import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading, user } = context;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // 🧩 Filter product by category
  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );

  // 🧡 Wishlist State
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // 🛒 Add / Remove from cart
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("🛒 Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("🗑️ Removed from cart");
  };

  // ❤️ Toggle Wishlist
  const toggleWishlist = async (id) => {
    const pid = id.toString();

    if (!user) {
      // Guest user (localStorage)
      let updated = wishlist.includes(pid)
        ? wishlist.filter((wid) => wid !== pid)
        : [...wishlist, pid];

      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      toast(
        wishlist.includes(pid)
          ? "💔 Removed from wishlist"
          : "❤️ Added to wishlist"
      );
      return;
    }

    // Logged-in user (Firebase)
    const itemRef = doc(fireDB, "wishlists", user.uid, "items", pid);
    if (wishlist.includes(pid)) {
      await deleteDoc(itemRef);
      setWishlist(wishlist.filter((wid) => wid !== pid));
      toast("💔 Removed from wishlist");
    } else {
      await setDoc(itemRef, { addedAt: Date.now() });
      setWishlist([...wishlist, pid]);
      toast("❤️ Added to wishlist");
    }
  };

  // Sync cart & wishlist with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="py-10 bg-gradient-to-br from-violet-100 via-white to-pink-50 min-h-screen">
        {/* 🏷 Category Heading */}
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-10 first-letter:uppercase">
          {categoryname} Products
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="container mx-auto px-5 max-w-7xl">
            {filterProduct.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filterProduct.map((item, index) => {
                  const { id, title, price, productImageUrl, category } = item;
                  const isInCart = cartItems.some((p) => p.id === item.id);
                  const isWishlisted = wishlist.includes(id.toString());

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden relative"
                    >
                      {/* ❤️ Wishlist Icon */}
                      <div className="absolute top-3 right-3 z-10">
                        <Heart
                          onClick={() => toggleWishlist(id)}
                          className={`cursor-pointer ${
                            isWishlisted
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                          size={24}
                        />
                      </div>

                      <div
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="relative cursor-pointer"
                      >
                        <img
                          src={productImageUrl}
                          alt={title}
                          className="w-full h-60 object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-violet-500 text-white text-xs px-2 py-1 rounded-full shadow">
                          {category}
                        </span>
                      </div>

                      <div className="p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          {title.length > 25
                            ? title.substring(0, 25) + "..."
                            : title}
                        </h2>
                        <p className="text-violet-600 font-bold text-lg mb-3">
                          Rs: {price}
                        </p>

                        {isInCart ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-all duration-200"
                          >
                            Remove from Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 rounded-lg transition-all duration-200"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <img
                  className="mx-auto mb-3 w-20"
                  src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                  alt="No Product"
                />
                <h2 className="text-lg text-gray-700 font-semibold">
                  No {categoryname} products found
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
