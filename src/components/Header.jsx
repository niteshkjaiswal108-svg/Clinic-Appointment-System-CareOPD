import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <section className="relative w-full overflow-hidden pt-36 pb-24 bg-gradient-to-b from-blue-50/60 to-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">

          {/* Accent badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-blue-100 text-blue-700 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            India’s Trusted OPD Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold
                         text-slate-900 leading-tight tracking-tight">
            Book Appointments <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-purple-500
                             bg-clip-text text-transparent">
              With Trusted Doctors
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
            Find verified specialists, compare experience, consultation fees,
            and book appointments in minutes — fast, secure, and reliable.
          </p>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <img
              src={assets.group_profiles}
              alt="Doctors"
              className="h-11"
            />
            <div className="text-sm text-slate-600">
              <p className="font-semibold text-slate-800">
                1000+ Verified Doctors
              </p>
              <p>Across 25+ specialities</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href="#speciality"
              className="
                inline-flex items-center gap-3
                px-8 py-3.5 rounded-full
                text-white font-semibold
                bg-gradient-to-r from-blue-600 via-teal-500 to-purple-500
                shadow-lg hover:shadow-xl
                hover:scale-[1.03] transition-all
              "
            >
              Book Appointment
              <img src={assets.arrow_icon} alt="" className="w-4 invert" />
            </a>

            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <span className="text-lg">✔</span>
              No signup required
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center">

          {/* Ambient gradient glow */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[520px] h-[520px] rounded-full
                            bg-gradient-to-br from-blue-400/20 via-teal-300/20 to-purple-400/20
                            blur-3xl" />
          </div>

          {/* Image card */}
          <div className="relative bg-white border border-blue-100
                          rounded-3xl p-6 shadow-2xl
                          max-w-md w-full
                          hover:scale-[1.01] transition-transform">
            <img
              src={assets.header_img}
              alt="Healthcare"
              className="w-full"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Header
