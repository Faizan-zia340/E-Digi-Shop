// import { useContext } from "react";
// import Layout from "../../components/layout/Layout";
// import myContext from "../../context/myContext";
// import Loader from "../../components/loader/Loader";

// const UserDashboard = () => {
//     // user
//     const user = JSON.parse(localStorage.getItem('users'));

//     const context = useContext(myContext);
//     const { loading, getAllOrder } = context
//     // console.log(getAllOrder)

//     // console.log(user)
//     return (
//         <Layout>
//             <div className=" container mx-auto px-4 py-5 lg:py-8">
//                 {/* Top  */}
//                 <div className="top ">
//                     {/* main  */}
//                     <div className=" bg-purple-50 py-5 rounded-xl border border-purple-100">
//                         {/* image  */}
//                         <div className="flex justify-center">
//                             <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
//                         </div>
//                         {/* text  */}
//                         <div className="">
//                             {/* Name  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Name : </span>
//                                 {user?.name}
//                             </h1>

//                             {/* Email  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Email : </span>
//                                 {user?.email}
//                             </h1>

//                             {/* Date  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Date : </span>
//                                 {user?.date}
//                             </h1>

//                             {/* Role  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Role : </span>
//                                 {user?.role}
//                             </h1>
//                         </div>
//                     </div>
//                 </div>

//                 {/* bottom  */}
//                 <div className="bottom">
//                     {/* main 1 */}
//                     <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
//                         {/* text  */}
//                         <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

//                         <div className="flex justify-center relative top-10">
//                         {loading && <Loader/>}
//                         </div>

//                         {/* main 2 */}
//                         {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
//                             // console.log(order);
//                             return (
//                                 <div key={index}>
//                                     {order.cartItems.map((item, index) => {
//                                         // console.log('item', item);
//                                         const { id, date, quantity, price, title, productImageUrl, category } = item
//                                         // console.log('order', order)
//                                         const { status } = order
//                                         return (
//                                             <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-purple-100 md:flex-row">
//                                                 {/* main 3  */}
//                                                 <div className="w-full border-r border-purple-100 bg-purple-50 md:max-w-xs">
//                                                     {/* left  */}
//                                                     <div className="p-8">
//                                                         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
//                                                             <div className="mb-4">
//                                                                 <div className="text-sm font-semibold text-black">Order Id</div>
//                                                                 <div className="text-sm font-medium text-gray-900">#{id}</div>
//                                                             </div>

//                                                             <div className="mb-4">
//                                                                 <div className="text-sm font-semibold">Date</div>
//                                                                 <div className="text-sm font-medium text-gray-900">{date}</div>
//                                                             </div>

//                                                             <div className="mb-4">
//                                                                 <div className="text-sm font-semibold">Total Amount</div>
//                                                                 <div className="text-sm font-medium text-gray-900">₹ {price * quantity}</div>
//                                                             </div>

//                                                             <div className="mb-4">
//                                                                 <div className="text-sm font-semibold">Order Status</div>                              
//                                                                   <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>
                                                               
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 {/* right  */}
//                                                 <div className="flex-1">
//                                                     <div className="p-8">
//                                                         <ul className="-my-7 divide-y divide-gray-200">
//                                                             <li
//                                                                 className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
//                                                             >
//                                                                 <div className="flex flex-1 items-stretch">
//                                                                     <div className="flex-shrink-0">
//                                                                         <img
//                                                                             className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
//                                                                             src={productImageUrl}
//                                                                             alt="img"
//                                                                         />
//                                                                     </div>

//                                                                     <div className="ml-5 flex flex-col justify-between">
//                                                                         <div className="flex-1">
//                                                                             <p className="text-sm font-bold text-gray-900">{title}</p>
//                                                                             <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
//                                                                         </div>

//                                                                         <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="ml-auto flex flex-col items-end justify-between">
//                                                                     <p className="text-right text-sm font-bold text-gray-900">₹ {price}</p>
//                                                                 </div>
//                                                             </li>
//                                                         </ul>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )
//                                     })}
//                                 </div>
//                             )
//                         })}

//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default UserDashboard;
import { useState, useContext } from "react";
import Layout from "../../components/layout/Layout";
import { LogOut, Package, Heart, User, LayoutDashboard } from "lucide-react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

import { useNavigate } from "react-router";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const user = JSON.parse(localStorage.getItem("users"));
  const { loading, getAllOrder } = useContext(myContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  // ✅ Filter orders for current user
  const myOrders = getAllOrder.filter((o) => o.userid === user?.uid);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-50 py-10 px-4 lg:px-10 flex flex-col md:flex-row gap-6">
        
        {/* ===== Sidebar ===== */}
        <aside className="w-full md:w-1/4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-violet-100 p-5">
          <h2 className="text-xl font-extrabold text-violet-700 text-center mb-6">
            My Dashboard
          </h2>
          <ul className="space-y-3 font-medium text-gray-700">
            <li
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${
                activeTab === "overview"
                  ? "bg-violet-600 text-white"
                  : "hover:bg-violet-100"
              }`}
            >
              <LayoutDashboard size={18} /> Overview
            </li>

            <li
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${
                activeTab === "orders"
                  ? "bg-violet-600 text-white"
                  : "hover:bg-violet-100"
              }`}
            >
              <Package size={18} /> My Orders
            </li>

        
            <li
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${
                activeTab === "profile"
                  ? "bg-violet-600 text-white"
                  : "hover:bg-violet-100"
              }`}
            >
              <User size={18} /> Profile Info
            </li>

            <li
              onClick={logout}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-red-100 text-red-600"
            >
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </aside>

        {/* ===== Main Content ===== */}
        <main className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-violet-100 p-6">
          {/* Overview */}
{activeTab === "overview" && (
  <div>
    <h1 className="text-2xl font-bold text-violet-700 mb-4">
      Welcome, {user?.name}! 👋
    </h1>
    <p className="text-gray-600">
      Here's a quick overview of your recent activity in E-Digi Shop.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
      {/* Total Orders */}
      <div className="p-5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-extrabold">{myOrders.length}</h2>
        <p className="text-sm mt-1">Total Orders</p>
      </div>

      {/* Total Spent */}
      <div className="p-5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-extrabold">
          Rs:&nbsp;
          {myOrders.reduce(
            (sum, o) =>
              sum + o.cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
            0
          )}
        </h2>
        <p className="text-sm mt-1">Total Spent</p>
      </div>

      {/* Account Status */}
      <div className="p-5 bg-gradient-to-r from-teal-500 to-emerald-400 text-white rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-extrabold">Active</h2>
        <p className="text-sm mt-1">Account Status</p>
      </div>
    </div>
  </div>
)}

         

          {/* Orders */}
        
          {activeTab === "orders" && (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-3xl font-bold text-violet-700">My Orders </h2>
      <button
        onClick={() => setActiveTab("overview")}
        className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1 transition-all"
      >
        ← Back
      </button>
    </div>

    {/* Orders List */}
    <div className="bg-gradient-to-br from-violet-100 via-white to-pink-50 rounded-2xl p-6 border border-violet-100 shadow-sm">
      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-center">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-xl border border-violet-100 shadow-sm hover:shadow-md transition-all"
            >
              <p className="font-semibold text-gray-800">
                Order ID: <span className="text-violet-700">#{order.id}</span>
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Date: {order.date} — Status:{" "}
                <span className="text-green-600 font-semibold">{order.status}</span>
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-700">
                  Total Items:{" "}
                  <span className="font-semibold">{order.cartItems.length}</span>
                </p>
                <p className="text-violet-700 font-bold">
                  Rs : {" "}
                  {order.cartItems.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


          {/* Profile */}
                   {activeTab === "profile" && (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-3xl font-bold text-violet-700">
        Profile Information 
      </h2>
      <button
        onClick={() => setActiveTab("overview")}
        className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1 transition-all"
      >
        ← Back
      </button>
    </div>

    {/* Profile Card */}
    <div className="bg-gradient-to-br from-violet-100 via-white to-pink-50 rounded-2xl p-6 border border-violet-100 shadow-sm max-w-md mx-auto">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-5">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-violet-200 shadow-md"
        />
        <h3 className="mt-3 text-xl font-bold text-gray-800">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-gray-700">
        <p className="flex justify-between">
          <span className="font-semibold text-violet-700">Role:</span>
          <span>{user?.role || "User"}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-violet-700">Joined:</span>
          <span>{user?.date || "N/A"}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-violet-700">Status:</span>
          <span className="text-green-600 font-semibold">Active</span>
        </p>
      </div>
    </div>
  </div>
)}

        </main>
      </div>
    </Layout>
  );
};

export default UserDashboard;
