'use client'

import Navbar from '../components/feature/Navbar'
import Footer from '../components/feature/Footer'
import Hero from '../pages/home/components/Hero'
import About from '../pages/home/components/About'
import Product from '../pages/home/components/Product'
import Performance from '../pages/home/components/Performance'
import Media from '../pages/home/components/Media'
import Contact from '../pages/home/components/Contact'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Product />
      <Performance />
      <Media />
      <Contact />
      <Footer />
    </div>
  )
}

