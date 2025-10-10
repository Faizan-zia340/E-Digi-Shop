
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupFunction = async () => {
    if (!userSignup.name || !userSignup.email || !userSignup.password) {
      toast.error("All Fields are required");
      return;
    }
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      };
      await addDoc(collection(fireDB, "user"), user);
      setUserSignup({ name: "", email: "", password: "" });
      toast.success("Signup Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-violet-100 via-white to-violet-50">
      {loading && <Loader />}
      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md border border-violet-200 rounded-2xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-violet-700 mb-8">Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={userSignup.name}
          onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
          className="w-full mb-4 px-4 py-2 rounded-xl border border-violet-200 bg-white/50 outline-none text-violet-700 placeholder-violet-400"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={userSignup.email}
          onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
          className="w-full mb-4 px-4 py-2 rounded-xl border border-violet-200 bg-white/50 outline-none text-violet-700 placeholder-violet-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={userSignup.password}
          onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
          className="w-full mb-6 px-4 py-2 rounded-xl border border-violet-200 bg-white/50 outline-none text-violet-700 placeholder-violet-400"
        />

        <button
          onClick={userSignupFunction}
          className="w-full mb-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-all"
        >
          Signup
        </button>

        <div className="text-center text-gray-800">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-600 font-bold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;



