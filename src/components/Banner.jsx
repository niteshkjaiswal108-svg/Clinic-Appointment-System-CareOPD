import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className="w-full py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white border border-gray-200 rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">

          {/* Left Content */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              Book an Appointment in Minutes
            </h3>

            <p className="text-slate-600 max-w-md">
              Connect with verified doctors across top medical specialties and book instantly.
            </p>

            <button
              onClick={() => { navigate('/login'); scrollTo(0,0) }}
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-full font-medium
                text-white
                bg-gradient-to-r from-blue-500 to-blue-400
                hover:from-blue-600 hover:to-blue-500
                shadow-md hover:shadow-lg
                transition-all duration-300
              "
            >
              Create Free Account
              <img src={assets.arrow_icon} alt="" className="w-4 invert" />
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0 relative">
            {/* Optional subtle gradient behind the image */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-blue-100/30 to-blue-200/20 blur-2xl -z-10" />

            <div className="bg-slate-50 p-2 rounded-2xl shadow-lg">
              <img
                src={assets.appointment_img}
                alt="Appointment"
                className="w-56 md:w-64"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Banner
