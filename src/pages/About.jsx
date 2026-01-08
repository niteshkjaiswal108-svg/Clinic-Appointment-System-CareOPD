import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import Footer from '../components/Footer'

const About = () => {
  return (
    <section className="w-full min-h-screen pt-36 pb-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6 mb-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A]">
            About <span className="text-[#2563EB]">Us</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Building a smarter, faster, and more reliable way to access healthcare.
          </p>
        </div>

        {/* About Content */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">

          {/* Image */}
          <div className="md:w-1/2 w-full relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100/30 to-blue-200/30 rounded-3xl blur-2xl"></div>
            <img
              src={assets.about_image}
              alt="About Healthcare OPD"
              className="relative w-full rounded-3xl shadow-lg object-cover"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 w-full space-y-6 text-gray-700">
            <p className="leading-relaxed">
              Healthcare OPD is a modern digital healthcare platform designed
              to simplify how patients connect with trusted medical professionals.
              We eliminate long waiting times and unnecessary hospital visits
              by enabling seamless online appointment booking.
            </p>

            <p className="leading-relaxed">
              Our platform brings together verified doctors from multiple
              specialties, allowing patients to browse profiles, compare
              experience, and book appointments with confidence — all in one place.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                Our Vision
              </h3>
              <p className="leading-relaxed">
                To make quality healthcare accessible, transparent, and
                stress-free for everyone by combining technology, trust,
                and medical excellence.
              </p>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Why <span className="text-[#2563EB]">Choose Us</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            We focus on what truly matters — speed, comfort, and personalized care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition relative overflow-hidden group">
            <div className="absolute -inset-0 bg-gradient-to-br from-blue-100/40 to-blue-200/40 opacity-0 group-hover: rounded-2xl transition-all blur-2xl"></div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-3 relative z-10">
              Efficiency
            </h3>
            <p className="text-gray-600 leading-relaxed relative z-10">
              Book appointments instantly without long queues or waiting hours.
              Our streamlined system saves time for both patients and doctors.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition relative overflow-hidden group">
            <div className="absolute -inset-0 bg-gradient-to-br from-blue-100/40 to-blue-200/40 opacity-0 hover: rounded-2xl transition-all blur-2xl"></div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-3 relative z-10">
              Convenience
            </h3>
            <p className="text-gray-600 leading-relaxed relative z-10">
              Access trusted healthcare professionals anytime, anywhere.
              Manage appointments easily from your phone or computer.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition relative overflow-hidden group">
            <div className="absolute -inset-0 bg-gradient-to-br from-blue-100/40 to-blue-200/40 opacity-0 hover: rounded-2xl transition-all blur-2xl"></div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-3 relative z-10">
              Personalization
            </h3>
            <p className="text-gray-600 leading-relaxed relative z-10">
              Get doctor recommendations tailored to your needs, preferences,
              and medical history for a better healthcare experience.
            </p>
          </div>

        </div>

      </div>
      <Footer />
    </section>
  )
}

export default About
