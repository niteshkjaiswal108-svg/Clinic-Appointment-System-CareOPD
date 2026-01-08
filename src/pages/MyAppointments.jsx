import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) setAppointments(data.appointments.reverse())
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <section className="w-full min-h-screen pt-36 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12">
          My Appointments
        </h1>

        <div className="space-y-8">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl border border-blue-100
                         shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Top Gradient Bar */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

              <div className="p-6 flex flex-col md:flex-row gap-6">

                {/* Doctor Image */}
                <div className="w-full md:w-40 flex-shrink-0">
                  <div className="w-full h-48 md:h-40 rounded-2xl overflow-hidden ring-2 ring-blue-100">
                    <img
                      src={item.docData.image || '/default_doctor.png'}
                      alt={item.docData.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Dr. {item.docData.name}
                  </h3>

                  <p className="text-blue-600 font-medium">
                    {item.docData.speciality}
                  </p>

                  <div className="text-sm text-slate-600">
                    <p className="font-medium text-slate-500">Clinic Address</p>
                    <p>{item.docData.address?.line1}</p>
                    <p>{item.docData.address?.line2}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm mt-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                      📅 {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                      💳 {currencySymbol}{item.amount}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-3 justify-end md:items-end">
                  {!item.cancelled && (
                    <button className="px-6 py-2 rounded-xl font-semibold text-white
                      bg-gradient-to-r from-blue-600 to-cyan-500
                      hover:from-blue-700 hover:to-cyan-600
                      shadow-md hover:shadow-lg transition">
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-6 py-2 rounded-xl font-semibold
                        border border-red-400 text-red-500
                        hover:bg-red-50 transition">
                      Cancel
                    </button>
                  )}

                  {item.cancelled && (
                    <span className="px-5 py-2 rounded-xl text-sm font-semibold
                      bg-red-100 text-red-600">
                      Appointment Cancelled
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default MyAppointments
