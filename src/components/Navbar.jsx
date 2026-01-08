import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData, loading } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }

  const links = ['Home', 'All Doctors', 'About', 'Contact']
  const paths = ['/', '/doctors', '/about', '/contact']
  if (loading) return null;


  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500">
              <img
                src={assets.careOPD}
                alt="CareOPD"
                className="h-10 w-10 rounded-full bg-white p-1"
              />
            </div>
            <span className="hidden sm:block font-bold text-lg tracking-tight text-slate-900">
              Care<span className="text-blue-600">OPD</span>
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-semibold">
            {links.map((link, i) => (
              <NavLink
                key={i}
                to={paths[i]}
                className={({ isActive }) =>
                  `relative transition-all duration-300
                  ${isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-500'}`
                }
              >
                {link}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full rounded-full
                  bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500
                  transition-transform origin-left
                  ${location.pathname === paths[i] ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                />
              </NavLink>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {token && userData ? (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-400 shadow-sm"
                  />
                  <img
                    src={assets.dropdown_icon}
                    alt=""
                    className="w-4 opacity-60 group-hover:rotate-180 transition-transform"
                  />
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-4 w-48 rounded-xl bg-white
                                border border-slate-200 shadow-xl
                                opacity-0 scale-95 translate-y-2
                                group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                                transition-all duration-200">
                  <p
                    onClick={() => navigate('my-profile')}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('my-appointments')}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer rounded-b-xl"
                  >
                    Logout
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden md:inline-flex items-center gap-2
                           px-6 py-2 rounded-full text-sm font-semibold
                           bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500
                           text-white shadow-md hover:shadow-lg hover:scale-105
                           transition-all"
              >
                Create Account
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <ul className="flex flex-col gap-4 p-5 text-slate-700 font-medium">
              {links.map((link, i) => (
                <NavLink
                  key={i}
                  to={paths[i]}
                  onClick={() => setShowMenu(false)}
                  className="py-2 px-2 rounded-lg hover:bg-blue-50 transition"
                >
                  {link}
                </NavLink>
              ))}

              {!token && (
                <button
                  onClick={() => navigate('/login')}
                  className="mt-2 py-2 rounded-full font-semibold
                             bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500
                             text-white"
                >
                  Create Account
                </button>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
