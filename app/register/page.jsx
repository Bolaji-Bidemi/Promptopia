"use client";

import { useState, useEffect } from "react";
 import { useRouter } from "next/navigation";
 import axios from 'axios'
 import Toast from '@components/Toast'
 import toast from 'react-hot-toast'

const Register = () => {
 
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try{
      setLoading(true)
      setSubmitting(true)
      const response = await axios.post('/api/users/signup', user)
      
      Toast(response.data.message)
      router.push('/login')
    }catch(error){
      console.log(error.message)
      toast.error(error.response.data.error)
    }finally{
      setLoading(false)
      setSubmitting(false)
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabled(false);
    }else{
      setDisabled(true)
    }
  }, [user.email, user.password, user.username]);

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <div className="w-400 text-xl font-bold py-10">
        {loading && !disabled ? "Signing up..." : "Sign up"}
      </div>

      <div className="flex flex-col border-2 border-gray-400 py-5 px-3 gap-3 rounded-md">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={user.email}
          name="email"
          onChange={handleChange}
          className="p-2 mb-3 w-full"
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={user.password}
          name="password"
          onChange={handleChange}
          className="p-2 mb-3 w-full"
        />
        <input
          type="text"
          placeholder="Enter your username"
          required
          value={user.username}
          name="username"
          onChange={handleChange}
          className="p-2 mb-3 w-full"
        />

        <div className="w-full flex justify-center items-center">
          {disabled ? (
            <button type="button" className="gray_btn" disabled={disabled}>
              Signup
            </button>
          ) : (
            <button type="button" className="black_btn" onClick={handleSubmit}>
              {submitting ? "Sign up..." : "Signup"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
