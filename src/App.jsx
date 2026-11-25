import { MotionConfig } from 'framer-motion'
import BackToTop from './components/BackToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Expertise from './components/Expertise'
import Brands from './components/Brands'
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy-950">Skip to content</a>
      <Navbar />
      <main>
        <Hero /><About /><Experience /><Expertise /><Brands />
        <Certifications /><Achievements /><Education /><Contact />
      </main>
      <footer className="border-t border-white/10 bg-navy-950 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Aslam Alphonas · AV Solutions Professional · Lahore, Pakistan
      </footer>
      <BackToTop />
    </MotionConfig>
  )
}
