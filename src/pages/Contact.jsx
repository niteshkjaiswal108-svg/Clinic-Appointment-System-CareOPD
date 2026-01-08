import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <section className="w-full min-h-screen pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A]">
            Contact <span className="text-[#2563EB]">Us</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We’re here to help. Reach out to us for support, partnerships, or career opportunities.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={assets.contact_image}
              alt="Contact Healthcare OPD"
              className="w-full rounded-3xl shadow-lg object-cover"
            />
          </div>

          {/* Info Card */}
          <div className="md:w-1/2 w-full bg-white rounded-3xl shadow-lg p-8 space-y-8">

            {/* Office */}
            <div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                Our Office
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Healthcare OPD Pvt. Ltd.<br />
                Sector 62, Noida, Uttar Pradesh<br />
                India – 201309
              </p>

              <p className="mt-3 text-gray-600">
                <span className="font-medium text-[#0F172A]">Email:</span> support@healthcareopd.com
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-[#0F172A]">Phone:</span> +91 98765 43210
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Careers */}
            <div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                Careers
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Join our mission to transform healthcare using technology.
                We’re always looking for passionate developers, designers,
                and healthcare professionals.
              </p>

              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1E40AF] transition">
                Explore Jobs
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
