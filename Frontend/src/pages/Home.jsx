import React, { useEffect, useState } from "react";
import DashboardCards from "../components/Dashboardcards";



const Home = () =>{
    const [user , setUser] = useState(null);

    
    const fetchUser = async() =>{

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/home`, {
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
      <>
        {user ? (
          <div className="text-center min-h-screen w-screen bg-white ">
            <DashboardCards />
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </>
    );
};

export default Home;