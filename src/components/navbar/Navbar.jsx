import { Link, Navigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { Users } from "lucide-react";
// import { User, ShoppingCart } from "lucide-react";

const Navbar = () => {


    const logout=()=>{
        localStorage.clear('users');
        Navigate('/login')

    }
    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>
            {/* Signup */}
            {!Users ? <li>
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}
            {/* Signup */}
            {! Users ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}
            {/* User */}
            {Users?.role === "user" && <li>
                <Link to={'/user-dashboard'}>User</Link>
            </li>}
            {/* Admin */}
            {Users?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>}
            {/* logout */}
            {Users && <li className=" cursor-pointer" onClick={logout}>
            </li>}
            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                </Link>
            </li>
        </ul>
    )

    return (
        <nav className="bg-gradient-to-r from-violet-500 to-purple-600 bg-opacity-80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
            <div className="lg:flex lg:justify-between items-center py-4 lg:px-8">
                {/* Left */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-3xl tracking-wide">E-Digi Shop</h2>
                    </Link>
                </div>

                {/* Center */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar */}
                <div className="hidden lg:block">
                    <SearchBar className="bg-white bg-opacity-90 text-gray-700 rounded-full shadow-md transition duration-300 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-violet-500" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;



// import { Link } from "react-router-dom";
// import SearchBar from "../searchBar/SearchBar";
// import { User, ShoppingCart, ChevronDown } from "lucide-react";
// import { useState } from "react";

// const Navbar = () => {
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     // Toggle the dropdown
//     const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//     // navList Data
//     const navList = (
//         <ul className="flex space-x-4 text-white font-semibold text-lg px-5">
//             {/* All Product */}
//             <li>
//                 <Link className="hover:text-violet-200 transition duration-300" to={'/allproduct'}>All Product</Link>
//             </li>

//             {/* Signup */}
//             {!User?
//             <li>
//                 <Link className="hover:text-violet-200 transition duration-300" to={'/signup'}>Signup</Link>
//             </li>:""
//             }

//             {/* Cart */}
//             <li className="relative flex items-center">
//                 <Link className="hover:text-violet-200 transition duration-300 flex items-center" to={'/cart'}>
//                     <ShoppingCart className="w-6 h-6" />
//                     <span className="ml-1">Cart</span>
//                     <span className="absolute -top-2 -right-2 bg-violet-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                         0
//                     </span>
//                 </Link>
//             </li>
//             {/* Profiles */}
//             <li className="relative">
//                 <div className="flex items-center cursor-pointer hover:text-violet-200 transition duration-300" onClick={toggleDropdown}>
//                     <User className="w-5 h-5 mr-1" />
//                     <span>Profiles</span>
//                     <ChevronDown className="w-5 h-5 ml-1" />
//                 </div>
//                 {dropdownOpen && (
//                     <ul className="absolute bg-white text-gray-800 shadow-lg rounded-md mt-2 right-0">
//                         <li className="hover:bg-violet-100 px-4 py-2">
//                             <Link to={'/user-dashboard'}>User</Link>
//                         </li>
//                         <li className="hover:bg-violet-100 px-4 py-2">
//                             <Link to={'/admin-dashboard'}>Admin</Link>
//                         </li>
//                     </ul>
//                 )}
//             </li>


//         </ul>
//     );

//     return (
//         <nav className="bg-gradient-to-r from-violet-500 to-purple-600 bg-opacity-80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
//             <div className="lg:flex lg:justify-between items-center py-4 lg:px-8">
//                 {/* Left */}
//                 <div className="left py-3 lg:py-0">
//                     <Link to={'/'}>
//                         <h2 className="font-bold text-white text-3xl tracking-wide">E-Digi Shop</h2>
//                     </Link>
//                 </div>

//                 {/* Center */}
//                 <div className="right flex justify-center mb-4 lg:mb-0">
//                     {navList}
//                 </div>

//                 {/* Search Bar */}
//                 <div className="hidden lg:block">
//                     <SearchBar className="bg-white bg-opacity-90 text-gray-700 rounded-full shadow-md transition duration-300 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-violet-500" />
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;
