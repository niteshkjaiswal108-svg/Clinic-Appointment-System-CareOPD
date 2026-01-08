import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Footer from '../components/Footer'

const Doctor = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          doc => doc.speciality.toLowerCase() === speciality.toLowerCase()
        )
      )
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  if (!doctors || doctors.length === 0)
    return (
      <div className="mt-40 text-center text-gray-500 text-lg">
        Loading doctors...
      </div>
    )

  const specialties = [
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Gastroenterologist'
  ]

  return (
    <section className="w-full min-h-screen pt-36 pb-20 overflow-x-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          {speciality ? `${speciality} Specialists` : 'All Doctors'}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Browse through verified doctors, check their specialties, and book appointments with ease.
        </p>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm md:sticky md:top-32">
              <h3 className="font-semibold text-navy mb-4 text-center md:text-left">
                Specialties
              </h3>
              <div className="flex md:flex-col flex-wrap gap-2 justify-center md:justify-start">
                {specialties.map((spec, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/doctors/${spec}`)}
                    className="px-4 py-2 rounded-lg bg-[#F8FAFC] hover:bg-gradient-to-r from-blue-400 to-blue-600 hover:text-white transition font-medium text-sm md:w-full text-center"
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0,0) }}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500 transition cursor-pointer"
              >
                {/* Doctor Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                    Available
                  </span>
                </div>

                {/* Doctor Info */}
                <div className="p-5 space-y-1 text-left">
                  <p className="text-lg font-semibold text-navy group-hover:text-blue-600 transition">
                    Dr. {item.name}
                  </p>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                  <p className="text-xs text-gray-500">10+ years experience</p>
                </div>

                {/* CTA Button */}
                <div className="p-5">
                  <button
                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0,0) }}
                    className="w-full py-2 rounded-full text-white font-medium bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition shadow-md"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Doctor
