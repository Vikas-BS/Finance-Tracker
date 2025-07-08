import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";



const Home = () =>{
    const [user , setUser] = useState(null);

    
    const fetchUser = async() =>{

        const res = await fetch("https://finance-tracker-pi-two.vercel.app/home", {
          method: 'GET',
          
          credentials: 'include'
        });
        const data = await res.json();
        if(res.ok){
            setUser(data.user)
        }else{
            console.error(data.message)
        }

    };
    
    
    useEffect (()=>{
        fetchUser();
    },[]);



    return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white">
      {user ? (
        <div className="text-center min-h-screen w-screen bg-white">
          <DashboardCards/>
           

        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;