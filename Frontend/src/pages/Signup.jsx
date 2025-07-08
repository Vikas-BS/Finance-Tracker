import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useUser } from '../context/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const {setUser} = useUser();

const handleSignup = async (data) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Signup success 🎉");

      if (setUser && result.user) {
        setUser(result.user);
      }

      navigate("/home");
    } else {
      toast.error("Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error during signup");
  }
};


  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl p-6 sm:p-8 space-y-6 bg-slate-800 rounded-lg shadow-md transition-all duration-300">
        <AuthForm type="signup" onSubmit={handleSignup} />
        <p className="text-md text-center text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
