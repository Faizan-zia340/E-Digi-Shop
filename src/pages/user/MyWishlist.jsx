// import { useEffect, useState, useContext } from "react";
// import Layout from "../../components/layout/Layout";
// import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/cartSlice";
// import { Heart } from "lucide-react";
// import myContext from "../../context/myContext";

// // Firebase imports
// import { auth, fireDB } from "../../firebase/FirebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const MyWishlist = () => {
//   const navigate = useNavigate();
//   const context = useContext(myContext);
//   const { getAllProduct } = context;

//   const [wishlist, setWishlist] = useState([]);
//   const [user, setUser] = useState(null);
//   const [unsubscribeWishlist, setUnsubscribeWishlist] = useState(null);

//   const dispatch = useDispatch();

//   // Track user login
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser || null);
//     });
//     return () => unsub();
//   }, []);

//   // Real-time wishlist sync
//   useEffect(() => {
//     if (unsubscribeWishlist) {
//       unsubscribeWishlist();
//       setUnsubscribeWishlist(null);
//     }

//     if (user?.uid) {
//       const wishlistRef = collection(fireDB, "wishlists", user.uid, "items");
//       const unsub = onSnapshot(wishlistRef, (snapshot) => {
//         const ids = [];
//         snapshot.forEach((doc) => ids.push(doc.id));
//         setWishlist(ids);
//       });
//       setUnsubscribeWishlist(() => unsub);
//       return () => unsub();
//     } else {
//       const local = localStorage.getItem("wishlist");
//       setWishlist(local ? JSON.parse(local) : []);
//     }
//   }, [user]);

//   // Remove item from wishlist
//   const removeFromWishlist = async (id) => {
//     const pid = id.toString();
//     if (!user) {
//       const updated = wishlist.filter((wid) => wid !== pid);
//       setWishlist(updated);
//       localStorage.setItem("wishlist", JSON.stringify(updated));
//       toast("💔 Removed from wishlist");
//       return;
//     }

//     try {
//       const itemRef = doc(fireDB, "wishlists", user.uid, "items", pid);
//       await deleteDoc(itemRef);
//       toast("💔 Removed from wishlist");
//     } catch (error) {
//       console.error("Error removing from wishlist:", error);
//       toast.error("Error removing item");
//     }
//   };

//   // Add to cart
//   const addCart = (item) => {
//     dispatch(addToCart(item));
//     toast.success("🛒 Added to cart");
//   };

//   const wishlistedProducts = getAllProduct.filter((p) =>
//     wishlist.includes(p.id.toString())
//   );

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-50 py-14">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center text-4xl font-extrabold text-violet-800 mb-12"
//         >
//           My Wishlist ❤️
//         </motion.h1>

//         {wishlistedProducts.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center text-gray-500 font-medium text-lg"
//           >
//             Your wishlist is empty. Add products you love!
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
//           >
//             {wishlistedProducts.map((item, i) => {
//               const { id, title, price, productImageUrl } = item;

//               return (
//                 <motion.div
//                   key={i}
//                   whileHover={{ scale: 1.03 }}
//                   transition={{ duration: 0.3 }}
//                   className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-violet-100 overflow-hidden"
//                 >
//                   {/* Heart remove */}
//                   <motion.div
//                     onClick={() => removeFromWishlist(id)}
//                     whileTap={{ scale: 0.9 }}
//                     className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow cursor-pointer"
//                   >
//                     <Heart className="fill-red-500 text-red-500" size={22} />
//                   </motion.div>

//                   {/* Product image */}
//                   <div className="relative group">
//                     <img
//                       src={productImageUrl}
//                       alt={title}
//                       onClick={() => navigate(`/productinfo/${id}`)}
//                       className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110 cursor-pointer"
//                     />
//                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center items-center gap-3">
//                       <button
//                         onClick={() => addCart(item)}
//                         className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all"
//                       >
//                         Add to Cart
//                       </button>
//                       <button
//                         onClick={() => navigate(`/productinfo/${id}`)}
//                         className="bg-white text-violet-700 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-violet-100 transition-all"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>

//                   {/* Info */}
//                   <div className="p-5 text-center">
//                     <h2 className="text-xs text-violet-700 font-semibold mb-1 uppercase tracking-wide">
//                       E-Digi Shop
//                     </h2>
//                     <h1 className="text-lg font-bold text-gray-800 truncate">
//                       {title}
//                     </h1>
//                     <p className="text-xl font-extrabold text-violet-600 mt-1">
//                       ₹ {price}
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default MyWishlist;
import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Heart } from "lucide-react";
import myContext from "../../context/myContext";

// Firebase imports
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const MyWishlist = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [unsubscribeWishlist, setUnsubscribeWishlist] = useState(null);

  const dispatch = useDispatch();

  // Track user login
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

  // Remove item from wishlist
  const removeFromWishlist = async (id) => {
    const pid = id.toString();
    if (!user) {
      const updated = wishlist.filter((wid) => wid !== pid);
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      toast("💔 Removed from wishlist");
      return;
    }

    try {
      const itemRef = doc(fireDB, "wishlists", user.uid, "items", pid);
      await deleteDoc(itemRef);
      toast("💔 Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing item");
    }
  };

  // Add to cart
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("🛒 Added to cart");
  };

  const wishlistedProducts = getAllProduct.filter((p) =>
    wishlist.includes(p.id.toString())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-50 py-14">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl font-extrabold text-violet-800 mb-12"
        >
          My Wishlist ❤️
        </motion.h1>

        {wishlistedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 font-medium text-lg"
          >
            Your wishlist is empty. Add products you love!
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
          >
            {wishlistedProducts.map((item, i) => {
              const { id, title, price, productImageUrl } = item;

              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-violet-100 overflow-hidden"
                >
                  {/* Heart remove */}
                  <motion.div
                    onClick={() => removeFromWishlist(id)}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow cursor-pointer"
                  >
                    <Heart className="fill-red-500 text-red-500" size={22} />
                  </motion.div>

                  {/* Product image */}
                  <div className="relative group">
                    <img
                      src={productImageUrl}
                      alt={title}
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center items-center gap-3">
                      <button
                        onClick={() => addCart(item)}
                        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="bg-white text-violet-700 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-violet-100 transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Info */}
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
        )}
      </div>
    </Layout>
  );
};

export default MyWishlist;
