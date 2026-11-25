import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Mail, ChevronDown } from 'lucide-react'
import { profile } from '../data'

const bars = Array.from({ length: 36 }, (_, i) => i)
const focus = ['Audio Visual Solutions', 'Unified Communications', 'Video Conferencing', 'Digital Signage & Displays', 'Projection Systems', 'Corporate Solution Sales']

export default function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % focus.length), 2600); return () => clearInterval(t) }, [])

  // Soft spotlight that follows the pointer
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="home" onMouseMove={onMove} className="spotlight relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 pt-16">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <motion.div className="absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-teal/20 blur-3xl" aria-hidden="true"
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden="true"
        animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center gap-1.5 px-4 opacity-60" aria-hidden="true">
        {bars.map((b) => (
          <span key={b} className="eq-bar w-full max-w-[18px] rounded-t bg-gradient-to-t from-teal/10 to-turq"
            style={{ height: `${40 + ((b * 37) % 60)}%`, animationDelay: `${(b % 9) * 0.17}s`, animationDuration: `${1.2 + (b % 5) * 0.25}s` }} />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-40 sm:px-8">
        <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-gold/60 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-soft">
          24+ Years of Experience
        </motion.p>

        <h1 aria-label={profile.name} className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
          {profile.name.split(' ').map((w, wi) => (
            <span key={wi} aria-hidden="true" className="mr-4 inline-block whitespace-nowrap">
              {[...w].map((c, ci) => (
                <motion.span key={ci} className="inline-block" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (wi * 6 + ci) * 0.045, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>{c}</motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
          <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">{profile.subtitle}</p>
          <p className="mt-3 flex h-8 items-center gap-2 text-slate-300">
            <span className="text-slate-400">Specialises in</span>
            <span className="relative inline-block h-8 min-w-[16rem] overflow-hidden font-semibold text-teal-glow">
              <AnimatePresence mode="wait">
                <motion.span key={i} className="absolute left-0" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.35 }}>
                  {focus[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
          <p className="mt-1 text-sm text-slate-400">{profile.location}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="#experience" className="shine rounded-xl bg-gradient-to-r from-teal to-turq px-7 py-3.5 font-semibold text-navy-950 shadow-lg shadow-teal/30">Explore My Experience</motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="#contact" className="rounded-xl border border-white/30 px-7 py-3.5 font-semibold transition hover:border-gold hover:text-gold-soft">Contact Me</motion.a>
          </div>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-300">
            <a href="/Aslam_Alphonas_CV.pdf" download className="inline-flex items-center gap-2 hover:text-teal-glow"><Download size={16} aria-hidden="true" />Download CV</a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-teal-glow"><Mail size={16} aria-hidden="true" />{profile.email}</a>
          </div>
        </motion.div>
      </div>
      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-teal-glow"><ChevronDown className="animate-bounce" /></a>
    </section>
  )
}
