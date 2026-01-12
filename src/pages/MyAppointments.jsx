import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  const slotDateFormat = (slotDate) => {
    const d = slotDate.split("_");
    return `${d[0]} ${months[Number(d[1])]} ${d[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <section className="w-full min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            My Appointments
          </h1>
          <p className="text-gray-500 mt-2">
            View and manage your upcoming and past consultations
          </p>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
            <p className="text-gray-600 text-lg">No appointments found</p>
          </div>
        )}

        {/* Appointment Cards */}
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 
              shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6">

                {/* Doctor Image */}
                <div className="w-full md:w-36 flex-shrink-0">
                  <div className="w-full h-44 md:h-36 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={item.docData.image || "/default_doctor.png"}
                      alt={item.docData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dr. {item.docData.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {item.docData.speciality}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-500">Clinic Address</p>
                    <p>{item.docData.address?.line1}</p>
                    <p>{item.docData.address?.line2}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                      {slotDateFormat(item.slotDate)} • {item.slotTime}
                    </span>

                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {currencySymbol}{item.amount}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-3 justify-end md:items-end">
                  {!item.cancelled && !item.isCompleted && (
                    <button className="px-5 py-2 rounded-xl text-sm font-medium
                    bg-blue-600 text-white hover:bg-blue-700 transition">
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-5 py-2 rounded-xl text-sm font-medium
                      border border-red-300 text-red-500 hover:bg-red-50 transition"
                    >
                      Cancel
                    </button>
                  )}

                  {item.cancelled && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium
                    bg-red-100 text-red-600">
                      Cancelled
                    </span>
                  )}

                  {item.isCompleted && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium
                    bg-green-100 text-green-600">
                      Completed
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyAppointments;
