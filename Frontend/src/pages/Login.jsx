import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      if (res.ok) {
        if (result.user.name) {
          setUser(result.user.name);
        }
        navigate("/home");
        toast.success("Loggedin Successfuly!!!");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      toast.error("Error during login");
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ token: credentialResponse.credential }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("token", result.token);
        if (result.user.name) {
          setUser(result.user.name);
        }
        if (!result.user.hasPassword) {
          navigate("/set-password");
        } else {
          toast.success("Loggedin Succesfuly!!!");
          navigate("/home");
        }
      } else {
        toast.error("Google login failed");
      }
    } catch (err) {
      toast.error("Error during Google login");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess, 
    onError: () => console.log("Google login failed"),
    auto_select: false,
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-900 ">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl p-6 sm:p-8 space-y-6 bg-slate-800  rounded-lg shadow-md transition-all duration-300">
        <AuthForm type="login" onSubmit={handleLogin} />
        <div className="flex justify-center ">
          <button
            onClick={() => login()}
            className=" flex justify-center items-center gap-2 px-4 py-2 border rounded text-slate-100 bg-white/10 hover:bg-white/20 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className="text-md text-center  text-slate-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
