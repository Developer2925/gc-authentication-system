import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const backendURL = "http://localhost:3000";//"https://gc-authentication-system-server.onrender.com" 
  // User Verification
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/auth/home`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        navigate("/login");
      }

      if (response.status === 201) {
        setUsername(response.data.username);
        toast.success(`Welcome ${response.data.username}`);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("user logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen px-5 py-5 bg-[#1a1a1a]">
      <div className="flex flex-col gap-2 font-bold text-6xl h-full w-full justify-center items-center">
        <p className="text-[#f1f1f1]">Welcome</p>
        <p className="text-[#f1f1f1]">ようこそ</p>
        <p className="text-[#f1f1f1]">{username}</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-3 py-2 bg-[#f1f1f1] text-[#010101] text-sm rounded fixed top-2 right-3 hover:bg-[#cacaca] delay-75 transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
