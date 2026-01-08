import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
    const {doctors} = useContext(AppContext)
    const [relDoc, setRelDocs] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== doc)
            setRelDocs(doctorData)
        }
    }, [doctors,speciality,docId])
  return (
    <div>
        <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Top Doctors Near You
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Consult trusted and experienced doctors across multiple
          specialties and book appointments instantly.
        </p>

        {/* Doctors Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              key={index}
              onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-600 hover:shadow-xl transition"
            >
              {/* Doctor Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                {/* Availability Badge */}
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                  Available
                </span>
              </div>

              {/* Doctor Info */}
              <div className="p-5 text-left space-y-1">
                <p className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition">
                  Dr. {item.name}
                </p>

                <p className="text-sm text-slate-600">
                  {item.speciality}
                </p>

                <p className="text-xs text-slate-500">
                  10+ years experience
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12">
          <button
            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            View All Doctors
          </button>
        </div>

      </div>
    </section>
    </div>
  )
}

export default RelatedDoctors