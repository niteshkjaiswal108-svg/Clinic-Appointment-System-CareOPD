import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Left Section */}
        <div className="space-y-4 relative">
          {/* Gradient Glow Behind Logo */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-100/20 to-blue-200/10 blur-3xl -z-10" />
          
          <img src={assets.careOPD} alt="Logo" className="h-20 w-20 relative z-10" />
          <p className="text-slate-600 text-sm leading-relaxed max-w-sm relative z-10">
            Healthcare OPD connects patients with trusted doctors, making appointment booking
            simple, secure, and efficient — anytime, anywhere.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-slate-900 font-semibold mb-4 tracking-wide relative inline-block">
            Company
            <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 mt-1"></span>
          </p>
          <ul className="space-y-2 text-slate-600 text-sm">
            {['Home', 'About Us', 'Contact', 'Privacy Policy'].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-blue-500 hover:underline cursor-pointer transition-all duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-slate-900 font-semibold mb-4 tracking-wide relative inline-block">
            Get in Touch
            <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 mt-1"></span>
          </p>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="hover:text-blue-500 transition-colors cursor-pointer">+91 98765 43210</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer">support@healthcareopd.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-xs text-slate-500">
            © 2026 Healthcare OPD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
