import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  ['home', 'Home'], ['about', 'About'], ['experience', 'Experience'], ['expertise', 'Expertise'],
  ['brands', 'Brands'], ['certifications', 'Certifications'], ['achievements', 'Achievements'],
  ['education', 'Education'], ['contact', 'Contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  // Highlight the link of the section currently on screen
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(([id]) => { const el = document.getElementById(id); el && obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-900/85 backdrop-blur">
      <motion.div className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-teal via-turq to-gold" style={{ scaleX: progress }} />
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-display text-xl font-extrabold tracking-tight">
          <span className="text-teal-glow">A</span><span className="text-gold">A</span>
          <span className="ml-2 hidden text-sm font-medium text-slate-300 sm:inline">Aslam Alphonas</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm transition ${active === id ? 'text-teal-glow' : 'text-slate-300 hover:text-white'}`}>
                {label}
                {active === id && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-gold" />}
              </a>
            </li>
          ))}
        </ul>
        <button className="rounded-lg p-2 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-navy-900 px-5 lg:hidden">
            {links.map(([id, label], i) => (
              <motion.li key={id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className={`block py-3 ${active === id ? 'text-teal-glow' : 'text-slate-200'}`}>{label}</a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
