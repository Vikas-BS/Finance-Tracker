import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useUser } from "../context/UserContext";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user, setUser, theme, toogleTheme } = useUser();
  const location = useLocation();
  const hideOn = ["/", "/login", "/signup"];
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/home`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          setUser(null);
          return;
        }
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      }
    };

    if (!hideOn.includes(location.pathname)) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (hideOn.includes(location.pathname)) return null;

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      toast.error("Logout Failed");
    }
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="bg-white text-black dark:bg-black/80 dark:text-white  px-6 py-3 shadow-lg flex items-center justify-between border-b border-gray-200 dark:border-none">
        <div className="flex items-center gap-4 ">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-400 hover:bg-blue-700  dark:text-white p-2 rounded-md transition"
            title="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-sans italic tracking-wide break-words">
            Hi, Welcome back {user?.name || "User"} 👋🏻
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toogleTheme}
            className="ml-4 px-3 py-1 bg-white dark:bg-gray-700 dark:text-white rounded-full text-sm flex items-center gap-2 transition"
          >
            {theme === "light" ? (
              <>
                <Moon size={18} />
              </>
            ) : (
              <>
                <Sun size={18} />
              </>
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-white rounded-full transition"
              title="Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                />
              </svg>
            </button>

            {open && (
              <ul className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-xl z-50 py-2 text-sm text-gray-700 animate-fadeIn">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
