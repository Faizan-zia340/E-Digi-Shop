
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const [resetEmail, setResetEmail] = useState("");
    const [showReset, setShowReset] = useState(false);

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            const q = query(collection(fireDB, "user"), where('uid', '==', users?.user?.uid));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => user = doc.data());
                localStorage.setItem("users", JSON.stringify(user));
                setUserLogin({ email: "", password: "" });
                toast.success("Login Successful");
                setLoading(false);
                if (user.role === "user") {
                    navigate('/user-dashboard');
                } else {
                    navigate('/admin-dashboard');
                }
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
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}

            <div className="login_Form bg-purple-50 px-8 py-6 border border-purple-100 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-violet-500'>
                        Login
                    </h2>
                </div>

                {!showReset ? (
                    <>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder='Email Address'
                                value={userLogin.email}
                                onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                                className='bg-purple-50 border border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple200'
                            />
                        </div>

                        <div className="mb-5">
                            <input
                                type="password"
                                placeholder='Password'
                                value={userLogin.password}
                                onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                                className='bg-purple-50 border border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple-200'
                            />
                        </div>

                        <div className="mb-5">
                            <button
                                type='button'
                                onClick={userLoginFunction}
                                className='bg-violet-500 hover:bg-purple-600 w-full text-white text-center py-2 font-bold rounded-md'
                            >
                                Login
                            </button>
                        </div>

                        <div className="text-center text-sm">
                            <span className='text-black'> do not have an account? </span>
                            <Link to={'/signup'} className='text-violet-500 font-bold'>
                                Signup
                            </Link>
                        </div>

                        <div className="text-center mt-3">
                            <button
                                className="text-sm text-violet-500 font-bold hover:underline"
                                onClick={() => setShowReset(true)}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className="bg-purple-50 border border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple200"
                            />
                        </div>

                        <div className="mb-5">
                            <button
                                type='button'
                                onClick={handleForgotPassword}
                                className='bg-purple-500 hover:bg-violet-600 w-full text-white text-center py-2 font-bold rounded-md'
                            >
                                Send Reset Email
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                className="text-sm text-violet-500 font-bold hover:underline"
                                onClick={() => setShowReset(false)}
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
