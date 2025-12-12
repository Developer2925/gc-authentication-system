import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  // Adding values to the variables
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const backendURL = "http://localhost:3000";

  // Changing the values
  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Form Submit Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/auth/register`, values);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#1a1a1a]">
        <div className="shadow-lg rounded-2xl bg-[#f1f1f1] px-8 py-5 border-none w-96 text-[#1a1a1a]">
          <h2 className="text-xl font-bold mb-4 w-full text-center">
            Register
          </h2>
          <form action="" onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id=""
                placeholder="Enter username"
                className="w-full px-3 py-2 border rounded outline-none"
                name="username"
                onChange={handleChanges}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id=""
                placeholder="Enter email"
                className="w-full px-3 py-2 border rounded outline-none"
                name="email"
                onChange={handleChanges}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id=""
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded outline-none"
                name="password"
                onChange={handleChanges}
              />
            </div>
            <button className="w-full bg-[#1a1a1a] text-[#f1f1f1] hover:bg-[#2c2c2c] transition-all delay-75 py-2 rounded">
              Register
            </button>
          </form>
          <div className="text-center flex gap-2">
            <span>Already have an account?</span>
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
