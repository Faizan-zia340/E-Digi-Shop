/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth ,fireDB } from "../../firebase/FireBaseCOnfig" ;
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const [loading, setLoading ] = useState(false);

    // navigate 
  // navigate 
const navigate = useNavigate();

// User Signup State 
const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
});

/**========================================================================
 *                          User Signup Function 
*========================================================================**/

const userSignupFunction = async () => {
    // validation 
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
        toast.error("All Fields are required")
    }

    setLoading(true);
    try {
        const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

        // create user object

        const user = {
            name: userSignup.name,
            email: users.user.email,
            uid: users.user.uid,
            role: userSignup.role,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }

        // create user Refrence
        const userRefrence = collection(fireDB, "user")

        // Add User Detail
        addDoc(userRefrence, user);

        setUserSignup({
            name: "",
            email: "",
            password: ""
        })

        toast.success("Signup Successfully");

        setLoading(true);
        navigate('/login')
    } catch (error) {
        console.log(error);
        setLoading(false);
    }

}
return (
    <div className='flex justify-center items-center h-screen'>
        {loading && <Loader/>}
        {/* Login Form  */}
        <div className="login_Form bg-purple-50 px-8 py-6 border border-purple-100 rounded-xl shadow-md">

            {/* Top Heading  */}
            <div className="mb-5">
                <h2 className='text-center text-2xl font-bold text-violet-500 '>
                    Signup
                </h2>
            </div>

            {/* Input One  */}
            <div className="mb-3">
                <input
                    type="text"
                    placeholder='Full Name'
                    value={userSignup.name}
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            name: e.target.value
                        })
                    }}
                    className='bg-purple-50 border border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple-200'
                />
            </div>

            {/* Input Two  */}
            <div className="mb-3">
                <input
                    type="email"
                    placeholder='Email Address'
                    value={userSignup.email}
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            email: e.target.value
                        })
                    }}
                    className='bg-purple-50 border border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple-200'
                />
            </div>

            {/* Input Three  */}
            <div className="mb-5">
                <input
                    type="password"
                    placeholder='Password'
                    value={userSignup.password}
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            password: e.target.value
                        })
                    }}
                    className='bg-purple-50 border border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple-200'
                />
            </div>

            {/* Signup Button  */}
            <div className="mb-5">
                <button
                    type='button'
                    onClick={userSignupFunction}
                    className='bg-violet-500 hover:bg-purple-600 w-full text-white text-center py-2 font-bold rounded-md '
                >
                    Signup
                </button>
            </div>

            <div>
                <h2 className='text-black'>Have an account <Link className=' text-purple-500 font-bold' to={'/login'}>Login</Link></h2>
            </div>

        </div>
    </div>
);
}

export default Signup;
// import Swal from 'sweetalert2'
// import React, {  useState } from 'react';
// import { doc, setDoc } from 'firebase/firestore'; 
// import { db,auth } from '../database/firebase.config';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
 


// const Signup = () => {
//     const navigate = useNavigate()
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//    const [isLoading, setisLoading] = useState(false);
   


//     const handleSignup = (e) => {
//          setisLoading(true)
//         e.preventDefault();
//         // Handle signup logic here
//         // console.log('Full Name:', fullName, 'Email:', email, 'Password:', password);
   
//     createUserWithEmailAndPassword(auth, email, password)
//     .then(async (response) => {
//       const uid = response.user.uid;
//       const userData= {fullName,email,uid}
//       localStorage.setItem("userId",uid)
//      await  setDoc(doc(db, "users", uid), userData)
//      setisLoading(false)

//       Swal.fire({
//         icon: "success",
//         title: "Signup Completed !",
//         text: "Do you want to continue",
//       });
//         navigate('/home')

//       // ...
//     })
//     .catch((error) => {   
//         console.error("Error during signup:", error);
//            Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text:error.message,
//     })
//      setisLoading(false)
//     });
// };

   
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md bg-white p-8 shadow-lg scale-110 rounded-lg">
//                 <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
//                 <form>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                        Full Name
//                         </label>
//                         <input
//                             type="text"
                        
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Enter your name"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                             Email
//                         </label>
//                         <input
//                             type="email"
                        
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             type="password"

//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>
//                     <div className="flex items-center justify-between">
//                     { isLoading ?
//                     <div className="w-full flex justify-center py-2 px-4 rounded">
//                     <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" className='h-6 w-6' />
//                     </div>
//                     : 
//                         <button
//                         onClick={handleSignup}
//                             type="submit"
//                             className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                         >
//                             Sign Up
//                         </button>
//                         }
//                     </div>
//                 </form>
//                 <p className="text-center text-gray-600  text-sm mt-6">
//                 Already have an account?<a href="/login" className="text-blue-500 hover:text-blue-700">log in</a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Signup;
