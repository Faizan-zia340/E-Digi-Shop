import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import HomePage from "./pages/home/HomePage"
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./components/productInfo/ProductInfo";
// import ScrollTop from "./components/scrollTop/ScrollTop"
 import CartPage from "./components/cart/CartPage";
 import AllProduct from "./pages/allproduct/AllProduct";
 import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./components/admin/UpdateProductPage";
import MyState from "../src/context/myState"
import { Toaster } from "react-hot-toast";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import CategoryPage from "./pages/categoryPage/CategoryPage";





const App=() => {
  return(
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/> }/> 
          <Route path="/*" element={<NoPage/> }/> 
          <Route path="/productinfo" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/addproduct" element={<AddProductPage />} />
          <Route path="/updateproduct" element={<UpdateProductPage />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
        </Routes>
           <Toaster/>
      </Router>
    </MyState>

  )
}
export default App;
 