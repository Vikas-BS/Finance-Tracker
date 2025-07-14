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
    <div className="w-full">
      {user ? (
        
          <div className="text-center min-h-screen w-screen bg-white">
            <DashboardCards />
          </div>
        
      ) : (
        <div className="flex w-screen justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">
          <p>Loading user info...</p>
        </div>
          
        
      )}
    </div>
  );
};

export default Home;
