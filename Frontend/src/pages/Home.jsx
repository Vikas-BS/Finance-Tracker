import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";

const Home = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/home`, {
      method: "GET",

      credentials: "include",
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      console.error(data.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white  flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      {user ? (
        
          <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl">
            <DashboardCards />
          </div>
        
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-slate-950-custom text-gray-700 dark:text-gray-200">
          <p>Loading user info...</p>
        </div>
      )}
    </div>
  );
};

export default Home;
