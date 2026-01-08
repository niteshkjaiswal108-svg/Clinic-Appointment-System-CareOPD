import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {name, password, email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {password, email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/', {replace: true})
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md space-y-6"
      >
        {/* Heading */}
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p className="text-gray-600 mt-2">
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointments
          </p>
        </div>

        {/* Name input (Sign Up only) */}
        {state === 'Sign Up' && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        {/* Toggle */}
        <p className="text-center text-gray-600">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() =>
              setState(state === 'Sign Up' ? 'Login' : 'Sign Up')
            }
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
