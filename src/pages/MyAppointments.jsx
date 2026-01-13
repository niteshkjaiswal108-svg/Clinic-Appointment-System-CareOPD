import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  const formatDate = (slotDate) => {
    const d = slotDate.split("_");
    return `${d[0]} ${months[Number(d[1])]} ${d[2]}`;
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) getAppointments();
  }, [token]);

  return (
    <section className="min-h-screen bg-[#f8fafc] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            My Appointments
          </h1>
          <p className="mt-2 text-slate-500 text-base">
            Manage your consultations and appointment history
          </p>
        </header>

        {/* Empty */}
        {appointments.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <p className="text-slate-600 text-lg">No appointments scheduled</p>
          </div>
        )}

        {/* Cards */}
        <div className="space-y-8">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]
              transition-all"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">

                {/* Doctor Image */}
                <div className="w-full md:w-32 flex-shrink-0">
                  <div className="w-full h-44 md:h-32 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={item.docData.image || "/default_doctor.png"}
                      alt={item.docData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Main Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Dr. {item.docData.name}
                    </h3>
                    <p className="text-sm font-medium text-blue-600">
                      {item.docData.speciality}
                    </p>
                  </div>

                  <div className="text-sm text-slate-600 leading-relaxed">
                    <p className="font-medium text-slate-500">Clinic Address</p>
                    <p>{item.docData.address?.line1}</p>
                    <p>{item.docData.address?.line2}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <MetaPill>
                      {formatDate(item.slotDate)} • {item.slotTime}
                    </MetaPill>

                    <MetaPill>
                      {currencySymbol}{item.amount}
                    </MetaPill>
                  </div>
                </div>

                {/* Actions / Status */}
                <div className="flex md:flex-col gap-3 md:items-end justify-between">
                  {!item.cancelled && !item.isCompleted && (
                    <>
                      <button className="px-5 py-2 rounded-xl text-sm font-medium
                      bg-blue-600 text-white hover:bg-blue-700 transition">
                        Pay Online
                      </button>

                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="px-5 py-2 rounded-xl text-sm font-medium
                        border border-red-300 text-red-500 hover:bg-red-50 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {item.cancelled && (
                    <StatusBadge color="red">Cancelled</StatusBadge>
                  )}

                  {item.isCompleted && (
                    <StatusBadge color="green">Completed</StatusBadge>
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

/* ----------------- UI Atoms ----------------- */

const MetaPill = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-sm
  bg-slate-100 text-slate-700">
    {children}
  </span>
);

const StatusBadge = ({ children, color }) => {
  const colors = {
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};
