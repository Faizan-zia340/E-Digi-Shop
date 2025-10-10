
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);

  const userLoginFunction = async () => {
    if (!userLogin.email || !userLogin.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
      const q = query(collection(fireDB, "user"), where("uid", "==", users?.user?.uid));
      const data = onSnapshot(q, (snapshot) => {
        let user;
        snapshot.forEach((doc) => (user = doc.data()));
        localStorage.setItem("users", JSON.stringify(user));
        setUserLogin({ email: "", password: "" });
        toast.success("Login Successful");
        setLoading(false);
        user.role === "user" ? navigate("/user-dashboard") : navigate("/admin-dashboard");
      });
      return () => data;
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Reset email sent!");
      setResetEmail("");
      setShowReset(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-violet-100 via-white to-violet-50">
      {loading && <Loader />}

      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md border border-violet-200 rounded-2xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-violet-700 mb-8">Login</h2>

        {!showReset ? (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={userLogin.email}
              onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
              className="w-full mb-4 px-4 py-2 rounded-xl border border-violet-200 bg-white/50 outline-none text-violet-700 placeholder-violet-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={userLogin.password}
              onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
              className="w-full mb-6 px-4 py-2 rounded-xl border border-violet-200 bg-white/50 outline-none text-violet-700 placeholder-violet-400"
            />

            <button
              onClick={userLoginFunction}
              className="w-full mb-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-all"
            >
              Login
            </button>

            <div className="text-center mb-4">
              <span className="text-gray-800">Don't have an account? </span>
              <Link to="/signup" className="text-violet-600 font-bold hover:underline">
                Signup
              </Link>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowReset(true)}
                className="text-violet-600 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-xl border border-violet-200 bg-white/50 outline-none text-violet-700 placeholder-violet-400"
            />
            <button
              onClick={handleForgotPassword}
              className="w-full mb-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-all"
            >
              Send Reset Email
            </button>
            <div className="text-center">
              <button
                onClick={() => setShowReset(false)}
                className="text-violet-600 font-bold hover:underline"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
