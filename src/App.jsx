
 import {
 
BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import MyWishlist from "./pages/user/MyWishlist";




const PageWrapper = ({ children }) => {
  return (
     <motion.div
      key={Math.random()} // ensures re-animation
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen bg-white text-gray-800"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/*" element={<PageWrapper><NoPage /></PageWrapper>} />
        <Route path="/productinfo/:id" element={<PageWrapper><ProductInfo /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
       <Route path="/allproduct" element={<PageWrapper><AllProduct /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/category/:categoryname" element={<PageWrapper><CategoryPage /></PageWrapper>} />
<Route
  path="/my-wishlist"
  element={
    <PageWrapper>
      <ProtectedRouteForUser>
        <MyWishlist />
      </ProtectedRouteForUser>
    </PageWrapper>
  }
/>
        <Route
          path="/user-dashboard"
          element={
            <PageWrapper>
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            </PageWrapper>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PageWrapper>
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            </PageWrapper>
          }
        />

        <Route
          path="/addproduct"
          element={
            <PageWrapper>
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            </PageWrapper>
          }
        />
        

        <Route
          path="/updateproduct/:id"
          element={
            <PageWrapper>
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <AnimatedRoutes />
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </Router>
    </MyState>
  );
};

export default App;
