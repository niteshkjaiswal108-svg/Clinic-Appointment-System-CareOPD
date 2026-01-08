import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="relative w-full py-24 bg-gradient-to-b from-white via-blue-50/40 to-teal-50/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Care by Specialty
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
          Choose from a wide range of medical specialities and
          connect with experienced, verified doctors.
        </p>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative bg-white rounded-2xl border border-slate-200
                         px-5 py-7 flex flex-col items-center gap-4
                         shadow-sm hover:shadow-xl
                         hover:-translate-y-1
                         transition-all duration-300"
            >
              {/* Icon Wrapper */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full
                             bg-gradient-to-br from-blue-400/20 via-teal-300/20 to-purple-400/20
                             blur-xl opacity-0 group-hover:opacity-100 transition"
                />
                <div
                  className="relative w-20 h-20 rounded-full
                             bg-gradient-to-br from-blue-100 to-teal-100
                             flex items-center justify-center
                             group-hover:from-blue-200 group-hover:to-teal-200
                             transition"
                >
                  <img
                    src={item.image}
                    alt={item.speciality}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <p className="text-sm font-semibold text-slate-700
                            group-hover:text-blue-600 transition-colors">
                {item.speciality}
              </p>

              {/* Subtle CTA hint */}
              <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition">
                View Doctors →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SpecialityMenu
