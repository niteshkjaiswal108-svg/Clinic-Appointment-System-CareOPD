import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className="w-full py-24 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Top Doctors Near You
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
          Connect instantly with trusted specialists across multiple
          medical fields and book appointments in just a few clicks.
        </p>

        {/* Doctors Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctors.slice(0, 8).map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
              className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden cursor-pointer
                         shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Doctor Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Availability Badge */}
                {item.available && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-teal-400
                                   text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold">
                    Available
                  </span>
                )}
              </div>

              {/* Doctor Info */}
              <div className="p-5 text-left space-y-1">
                <p className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Dr. {item.name}
                </p>

                <p className="text-sm text-slate-600 font-medium">
                  {item.speciality}
                </p>

                <p className="text-xs text-slate-500">
                  {item.experience || '10+ years experience'}
                </p>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/40 to-transparent opacity-0 group-hover:opacity-50 rounded-3xl transition-all"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16">
          <button
            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
            className="px-8 py-3 rounded-full font-semibold text-white
                       bg-gradient-to-r from-blue-600 via-teal-500 to-purple-500
                       hover:from-blue-700 hover:via-teal-600 hover:to-purple-600
                       transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Doctors
          </button>
        </div>

      </div>
    </section>
  )
}

export default TopDoctors
