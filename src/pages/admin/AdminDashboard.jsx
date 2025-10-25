// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import ProductDetail from '../../components/admins/ProductDetail'
// import OrderDetail from '../../components/admins/OrderDetail';
// import UserDetail from '../../components/admins/UserDEtail';
// import { useContext } from 'react';
// import myContext from '../../context/myContext';



// const AdminDashboard = () => {
//     const user = JSON.parse(localStorage.getItem('users'));
//     const context = useContext(myContext);
//     const {getAllProduct, getAllOrder, getAllUser} = context;
//   return (
//     <div>
//       {/* Top */}
//       <div className="top mb-5 px-5 mt-5">
//         <div className="bg-purple-50 py-5 border border-purple-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
//           <h1 className="text-center text-2xl font-bold text-violet-500">Admin Dashboard</h1>
//         </div>
//       </div>

//       <div className="px-5">
//         {/* Mid */}
//         <div className="mid mb-5">
//           <div className="bg-purple-50 py-5 rounded-xl border border-purple-100 shadow-md transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105">
//             {/* Image */}
//             <div className="flex justify-center items-center h-20">
//               <img
//                 src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRnJbf6AKUkKb4rskncNv4pgcaL-J1xjUm8_yEDdkblD6BIYWbi"
//                 alt="Profile"
//                 className="w-25 h-20 rounded-2xl bg-violet-300 transition duration-300 ease-in-out transform hover:scale-110"
//               />
//             </div>

//             {/* Text */}
//             <div className="text-center">
//               <h1 className="text-center text-lg text-violet-500">
//                 <span className="font-bold">Name: </span>
//                 {user?.name}
//               </h1>
//               <h1 className="text-center text-lg text-violet-500">
//                 <span className="font-bold">Email: </span>
//                 {user?.email}
//               </h1>
//               <h1 className="text-center text-lg text-violet-500">
//                 <span className="font-bold">Date: </span>
//                 {user?.date}
//               </h1>
//               <h1 className="text-center text-lg text-violet-500">
//                 <span className="font-bold">Role: </span>
//                 {user?.role}
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Bottom */}
//         <Tabs>
//           <TabList className="flex flex-wrap -m-4 text-center justify-center space-x-4">
//             {/* Total Products */}
//             <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
//               <div className="border bg-purple-50 hover:bg-purple-100 border-purple-100 px-4 py-3 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
//                 <div className="text-violet-500 w-12 h-12 mb-3 inline-block">
//                   <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket">
//                     <path d="m5 11 4-7" />
//                     <path d="m19 11-4-7" />
//                     <path d="M2 11h20" />
//                     <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
//                     <path d="m9 11 1 9" />
//                     <path d="M4.5 15.5h15" />
//                     <path d="m15 11-1 9" />
//                   </svg>
//                 </div>
//                 <h2 className="title-font font-medium text-3xl text-violet-400">{getAllProduct.length}</h2>
//                 <p className="text-violet-500 font-bold">Total Products</p>
//               </div>
//             </Tab>

//             {/* Total Order */}
//             <Tab  className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
//               <div className="border bg-purple-50 hover:bg-purple-100 border-purple-100 px-4 py-3 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
//                 <div className="text-violet-500 w-12 h-12 mb-3 inline-block">
//                   <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-ordered">
//                     <line x1={10} x2={21} y1={6} y2={6} />
//                     <line x1={10} x2={21} y1={12} y2={12} />
//                     <line x1={10} x2={21} y1={18} y2={18} />
//                     <path d="M4 6h1v4" />
//                     <path d="M4 10h2" />
//                     <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
//                   </svg>
//                 </div>
//                 <h2 className="title-font font-medium text-3xl text-violet-400">{getAllOrder.length}</h2>
//                 <p className="text-violet-500 font-bold">Total Order</p>
//               </div>
//             </Tab>

//             {/* Total User */}
//             <Tab  className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
//               <div className="border bg-purple-50 hover:bg-purple-100 border-purple-100 px-4 py-3 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
//                 <div className="text-violet-500 w-12 h-12 mb-3 inline-block">
//                   <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
//                     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//                     <circle cx={9} cy={7} r={4} />
//                     <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//                     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//                   </svg>
//                 </div>
//                 <h2 className="title-font font-medium text-3xl text-violet-400">{getAllUser.length}</h2>
//                 <p className="text-violet-500 font-bold">Total User</p>
//               </div>
//             </Tab>
//           </TabList>

//           {/* Always render TabPanel */}
//           <TabPanel>
//                             <ProductDetail />
//                         </TabPanel>
//                         <TabPanel>
//                             <OrderDetail/>
//                         </TabPanel>
//                         <TabPanel>
//                            <UserDetail/>
//                         </TabPanel>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import { useState, useContext } from "react";
import myContext from "../../context/myContext";
 import ProductDetail from '../../components/admins/ProductDetail'
import OrderDetail from '../../components/admins/OrderDetail';
import UserDetail from '../../components/admins/UserDetail';
import { LayoutDashboard, Package, ShoppingBag, Users } from "lucide-react";


const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser } = context;

  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-violet-600 to-purple-700 text-white p-5 flex flex-col shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 border-b border-violet-400 pb-3">
          Admin Panel
        </h1>

        <ul className="space-y-3">
          <li
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              activeTab === "dashboard"
                ? "bg-violet-500"
                : "hover:bg-violet-400/40"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </li>

          <li
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              activeTab === "products"
                ? "bg-violet-500"
                : "hover:bg-violet-400/40"
            }`}
          >
            <Package size={20} /> Products
          </li>

          <li
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              activeTab === "orders"
                ? "bg-violet-500"
                : "hover:bg-violet-400/40"
            }`}
          >
            <ShoppingBag size={20} /> Orders
          </li>

          <li
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              activeTab === "users" ? "bg-violet-500" : "hover:bg-violet-400/40"
            }`}
          >
            <Users size={20} /> Users
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-center border border-violet-100">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt="Admin"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-violet-300 shadow-md"
              />
              <h2 className="text-xl font-bold text-violet-600">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-500 text-sm mt-1">
                Role: <span className="font-medium">{user?.role}</span>
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl shadow p-5 text-center border border-violet-200 hover:scale-105 transition">
                <Package size={40} className="mx-auto text-violet-600 mb-3" />
                <h2 className="text-2xl font-bold text-violet-600">
                  {getAllProduct.length}
                </h2>
                <p className="text-gray-600 font-medium">Total Products</p>
              </div>

              <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl shadow p-5 text-center border border-violet-200 hover:scale-105 transition">
                <ShoppingBag size={40} className="mx-auto text-violet-600 mb-3" />
                <h2 className="text-2xl font-bold text-violet-600">
                  {getAllOrder.length}
                </h2>
                <p className="text-gray-600 font-medium">Total Orders</p>
              </div>

              <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl shadow p-5 text-center border border-violet-200 hover:scale-105 transition">
                <Users size={40} className="mx-auto text-violet-600 mb-3" />
                <h2 className="text-2xl font-bold text-violet-600">
                  {getAllUser.length}
                </h2>
                <p className="text-gray-600 font-medium">Total Users</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && <ProductDetail />}
        {activeTab === "orders" && <OrderDetail />}
        {activeTab === "users" && <UserDetail />}
      </main>
    </div>
  );
};

export default AdminDashboard;
