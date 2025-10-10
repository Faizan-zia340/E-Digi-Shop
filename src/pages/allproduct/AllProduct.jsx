import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Firebase imports
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [unsubscribeWishlist, setUnsubscribeWishlist] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsub();
  }, []);

  // Real-time wishlist sync
  useEffect(() => {
    if (unsubscribeWishlist) {
      unsubscribeWishlist();
      setUnsubscribeWishlist(null);
    }

    if (user?.uid) {
      const wishlistRef = collection(fireDB, "wishlists", user.uid, "items");
      const unsub = onSnapshot(wishlistRef, (snapshot) => {
        const ids = [];
        snapshot.forEach((doc) => ids.push(doc.id));
        setWishlist(ids);
      });
      setUnsubscribeWishlist(() => unsub);
      return () => unsub();
    } else {
      const local = localStorage.getItem("wishlist");
      setWishlist(local ? JSON.parse(local) : []);
    }
  }, [user]);

  // Keep guest wishlist locally
  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  // Toggle wishlist
  const toggleWishlist = async (item) => {
    const pid = item.id.toString();

    if (!user) {
      if (wishlist.includes(pid)) {
        setWishlist((prev) => prev.filter((id) => id !== pid));
        toast("💔 Removed from wishlist");
      } else {
        setWishlist((prev) => [...prev, pid]);
        toast.success("❤️ Added to wishlist");
      }
      return;
    }

    try {
      const itemRef = doc(fireDB, "wishlists", user.uid, "items", pid);

      if (wishlist.includes(pid)) {
        await deleteDoc(itemRef);
        toast("💔 Removed from wishlist");
      } else {
        await setDoc(itemRef, {
          productId: pid,
          addedAt: Date.now(),
        });
        toast.success("❤️ Added to wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Error updating wishlist");
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

  return (
    <Layout>
      <div className="py-14 bg-gradient-to-br from-violet-100 via-white to-violet-50 min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 text-4xl font-extrabold text-violet-800 tracking-wide"
        >
          Explore All Products
        </motion.h1>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
          >
            {getAllProduct.map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              const isInCart = cartItems.some((p) => p.id === id);
              const isWishlisted = wishlist.includes(id.toString());

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl border border-violet-100"
                >
                  {/* ❤️ Wishlist Heart */}
                  <motion.div
                    onClick={() => toggleWishlist(item)}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow cursor-pointer"
                  >
                    <Heart
                      size={22}
                      className={`transition-all duration-300 ${
                        isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
                      }`}
                    />
                  </motion.div>

                  {/* Product Image */}
                  <div className="relative group">
                    <img
                      src={productImageUrl}
                      alt={title}
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                    />
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
                      Rs : {price}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
