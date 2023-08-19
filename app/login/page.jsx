'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Toast from '@components/Toast'
import toast from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import Cookies from 'universal-cookie'

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const cookies = new Cookies()
  
  
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value
        }) 
    }

    const handleSubmit = async() => {
      try{
        setLoading(true)
        const response = await axios.post('/api/users/login', user)
        console.log(response)
        cookies.set("auth_token", response.data.myToken, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)})
        cookies.set("username", response.data.user.username, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)})
        cookies.set("email", response.data.user.email, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)})
        Toast(response.data.message)      
        router.push('/')
      }catch(error){
       console.log("login failed", error.message)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }


    }
    useEffect(()=> {
      if (
        user.email.length > 0 &&
        user.password.length > 0 
      ) {
        setDisabled(false);
      }else{
        setDisabled(true);
      }

    },[user.email, user.password])
  return (
    <div className="w-full h-full flex flex-col justify-center items-center border-6">
      <div className="w-400 text-xl font-bold py-10">
        {loading && !disabled ? "Sign in..." : "Sign in"}
      </div>
       <div className="w-lg flex flex-col border-2 py-5 px-3 gap-6">

       <input
        type="email"
        placeholder='Enter your email'
        required
        value={user.email}
        name="email"
        onChange={handleChange}
        className="p-2 mb-3 w-full"
        />
        <input
        type="password"
        placeholder='Enter your password'
        required
        value={user.password}
        name="password"
        onChange={handleChange}
        className="p-2 mb-3 w-full"
        />
        

        <div className="w-full flex justify-center items-center">
          {disabled ? (
            <button type="button" className="gray_btn" disabled={disabled}>
              Sign in
            </button>
          ) : (
            <button type="button" className="black_btn" onClick={handleSubmit}>
              {submitting ? "Sign in..." : "Sign in"}
            </button>
          )}
        </div>

       
       </div>
    </div>
  )
}

export default Login