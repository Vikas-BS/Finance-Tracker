import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import SetPassword from './pages/SetPassword';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="149634613993-g967k1d67f27sf2th9dl685k527ar9k2.apps.googleusercontent.com">
      <UserProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={2000} reverseOrder={false} />
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/incomepage" element={<IncomePage/>} />
            <Route path="/expensepage" element={<ExpensePage/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
