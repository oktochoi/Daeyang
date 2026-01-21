import { Suspense } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Product from './components/Product';
import Performance from './components/Performance';
import Media from './components/Media';
import Contact from './components/Contact';

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}
