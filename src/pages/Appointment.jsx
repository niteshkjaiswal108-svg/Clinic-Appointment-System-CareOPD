import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

const bookAppointment = async () => {
  if (!token) {
    toast.warn('Login To Book Appointment')
    return navigate('/login')
  }

  if (!slotTime) {
    return toast.error('Please select a time slot')
  }

  try {
    // Build slotDate (day_month_year)
    const dateObj = docSlots[slotIndex][0].datetime
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()

    const slotDate = `${day}_${month}_${year}`

    const { data } = await axios.post(
      `${backendUrl}/api/user/book-appointment`,
      {
        docId,
        slotDate,
        slotTime
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (data.success) {
      toast.success(data.message)
      getDoctorsData();
      navigate('/my-appointments')
    } else {
      toast.error(data.message)
    }

  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message || 'Something went wrong')
  }
}


  // Fetch doctor info
  useEffect(() => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  }, [doctors, docId]);

  // Generate slots
  useEffect(() => {
    if (!docInfo) return;
    const slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startHour = i === 0 ? Math.max(10, currentDate.getHours() + 1) : 10;
      let currentSlot = new Date(currentDate);
      currentSlot.setHours(startHour, 0, 0, 0);

      let endSlot = new Date(currentDate);
      endSlot.setHours(21, 0, 0, 0);

      let daySlots = [];
      while (currentSlot < endSlot) {

    const formattedTime = currentSlot.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    const slotDate = day + '_' + month + '_' + year;

    const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true;

    if (isSlotAvailable) {
        daySlots.push({
            datetime: new Date(currentSlot),
            time: formattedTime,  // ✅ use formattedTime here
        });
    }

    currentSlot.setMinutes(currentSlot.getMinutes() + 30);
}
      slots.push(daySlots);
    }
    setDocSlots(slots);
  }, [docInfo]);

  if (!docInfo)
    return (
      <div className="mt-40 text-center text-gray-500 text-lg">
        Loading doctor info...
      </div>
    );

  return (
    <section className="w-full min-h-screen pt-36 pb-20 overflow-x-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Doctor Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-8 flex items-center gap-2">
          Dr. {docInfo.name}
          <img src={assets.verified_icon} alt="Verified" className="w-6 h-6" />
        </h1>

        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Image */}
          <div className="md:w-1/3 w-full rounded-2xl overflow-hidden shadow-lg">
            <img src={docInfo.image} alt={docInfo.name} className="w-full h-auto object-cover"/>
          </div>

          {/* Right Info */}
          <div className="md:w-2/3 w-full space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-lg text-blue-600 font-semibold">{docInfo.degree} - {docInfo.speciality}</p>
              <p className="text-gray-600 mt-2">{docInfo.experience} experience</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-navy">About Doctor</p>
                <img src={assets.info_icon} alt="Info" className="w-5 h-5"/>
              </div>
              <p className="text-gray-600">{docInfo.about}</p>
            </div>

            <div className="bg-green-100 border border-green-500 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
              <p className="text-navy font-medium text-lg">Appointment Fee</p>
              <span className="text-green-600 font-bold text-xl">{currencySymbol}{docInfo.fees}</span>
            </div>
          </div>
        </div>

        {/* Appointment Slots */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-navy mb-4">Select Appointment Day</h3>
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-hide">
            {docSlots.map((daySlots, index) => {
              const date = daySlots[0]?.datetime;
              return (
                <button
                  key={index}
                  onClick={() => { setSlotIndex(index); setSlotTime(""); }}
                  className={`min-w-[80px] px-4 py-3 rounded-xl border text-center snap-start transition
                  ${slotIndex === index ? "bg-blue-600 text-white border-blue-600" : "bg-white text-navy border-gray-200 hover:border-blue-600"}`}
                >
                  <p className="text-sm font-medium">{date && daysOfWeek[date.getDay()]}</p>
                  <p className="text-lg font-bold">{date && date.getDate()}</p>
                </button>
              );
            })}
          </div>

          <h3 className="text-lg font-semibold text-navy mt-8 mb-4">Select Time Slot</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
            {docSlots[slotIndex]?.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSlotTime(slot.time)}
                className={`min-w-[90px] px-4 py-2 rounded-xl text-sm font-medium border snap-start transition whitespace-nowrap
                ${slotTime === slot.time ? "bg-green-500 text-white border-green-500" : "bg-white text-navy border-gray-200 hover:border-blue-600 hover:text-blue-600"}`}
              >
                {slot.time}
              </button>
            ))}
          </div>

          <button
          onClick={bookAppointment}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-400 text-white px-10 py-3 rounded-xl font-semibold shadow-md hover:from-blue-600 hover:to-blue-500 hover:shadow-lg active:scale-95 transition-all mt-6"
          >
            Book Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>

      <Footer />
    </section>
  );
};

export default Appointment;
