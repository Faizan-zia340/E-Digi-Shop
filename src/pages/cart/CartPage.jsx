import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import { motion } from "framer-motion";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast("🗑️ Removed from cart");
  };

  const handleIncrement = (id) => dispatch(incrementQuantity(id));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));

  const cartItemTotal = cartItems.reduce((a, b) => a + b.quantity, 0);
  const cartTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const user = JSON.parse(localStorage.getItem("users"));

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = async () => {
    if (
      !addressInfo.name ||
      !addressInfo.address ||
      !addressInfo.pincode ||
      !addressInfo.mobileNumber
    ) {
      return toast.error("All fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("✅ Order placed successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-50 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-4xl font-extrabold text-gray-800 mb-10"
          >
            Your Shopping Cart 
          </motion.h1>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-12 gap-10"
          >
            {/* 🛒 Cart Items */}
            <section className="lg:col-span-8 bg-white rounded-2xl shadow-lg p-6">
              {cartItems.length > 0 ? (
                <ul className="space-y-6">
                  {cartItems.map((item, index) => {
                    const { id, title, price, productImageUrl, quantity, category } = item;
                    return (
                     <motion.li
  key={index}
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3 }}
  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-violet-50 rounded-xl shadow-sm p-4 gap-4"
>
  {/* Product info */}
  <div className="flex items-center gap-4">
    <img
      src={productImageUrl}
      alt={title}
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-violet-100"
    />
    <div>
      <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{category}</p>
      <p className="font-bold text-violet-600 mt-1">Rs :{price}</p>
    </div>
  </div>

  {/* Quantity & Remove Buttons */}
  <div className="flex items-center justify-center sm:justify-end gap-3 flex-wrap">
    <button
      onClick={() => handleDecrement(id)}
      className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-violet-200 hover:bg-violet-300 text-gray-700 font-bold"
    >
      -
    </button>
    <input
      type="text"
      className="w-10 text-center border border-gray-200 rounded-md"
      value={quantity}
      readOnly
    />
    <button
      onClick={() => handleIncrement(id)}
      className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-violet-200 hover:bg-violet-300 text-gray-700 font-bold"
    >
      +
    </button>

    <button
      onClick={() => deleteCart(item)}
      className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm sm:text-base"
    >
      <Trash size={16} /> <span>Remove</span>
    </button>
  </div>
</motion.li>

                    );
                  })}
                </ul>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-600 text-lg py-20"
                >
                  🛒 Your cart is empty. Add something amazing!
                </motion.p>
              )}
            </section>

            {/* 💰 Summary Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 bg-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
                Price Details
              </h2>
              <dl className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <dt>Items ({cartItemTotal})</dt>
                  <dd>{cartTotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Delivery</dt>
                  <dd className="text-green-600 font-semibold">Free</dd>
                </div>
                <div className="flex justify-between border-t pt-3 font-bold text-gray-900">
                  <dt>Total</dt>
                  <dd>Rs : {cartTotal}</dd>
                </div>
              </dl>

              <div className="mt-6">
                {user ? (
                  <BuyNowModal
                    addressInfo={addressInfo}
                    setAddressInfo={setAddressInfo}
                    buyNowFunction={buyNowFunction}
                  />
                ) : (
                  <Navigate to="/login" />
                )}
              </div>
            </motion.section>
          </motion.form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
