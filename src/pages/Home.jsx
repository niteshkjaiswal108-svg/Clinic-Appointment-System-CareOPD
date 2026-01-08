import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      {/* Full width hero */}
      <Header />

      {/* Centered content */}
      <section className="max-w-7xl mx-auto px-6">
        <SpecialityMenu />
        <TopDoctors />
      </section>

      {/* Full width CTA */}
      <Banner />

      {/* Footer */}
      <Footer />
    </>
  )
}

export default Home
