import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";
import { toast } from "react-toastify";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/home`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        toast.error("User fetch failed:", data.message);
      }
    } catch (err) {
      toast.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen w-full p-6 bg-white dark:bg-slate-950-custom transition-colors">
      {loading ? (
        <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-200">
          <p>Loading user info...</p>
        </div>
      ) : user ? (
        <DashboardCards />
      ) : (
        <div className="flex justify-center items-center h-screen text-red-500 dark:text-red-300">
          <p>User not authenticated.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
