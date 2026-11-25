import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, MapPin, Download, Copy, Check } from 'lucide-react'
import { Section, container, itemV, inView } from './ui'
import { profile } from '../data'

export default function Contact() {
  const [toast, setToast] = useState('')
  const copy = async (label, value) => {
    try { await navigator.clipboard.writeText(value); setToast(`${label} copied`) }
    catch { setToast(`Could not copy. Select the ${label.toLowerCase()} manually.`) }
    setTimeout(() => setToast(''), 2200)
  }
  const items = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, cta: 'Send an email' },
    { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref, cta: 'Call now' },
    { icon: MapPin, label: 'Location', value: profile.location },
  ]
  return (
    <Section id="contact" alt title="Contact me" intro="Planning a meeting-room, collaboration or digital signage project? Get in touch to discuss it.">
      <motion.div variants={container} {...inView} className="grid gap-5 md:grid-cols-3">
        {items.map(({ icon: I, label, value, href, cta }) => (
          <motion.div key={label} variants={itemV} className="card card-hover flex flex-col p-6">
            <I className="text-teal-glow" aria-hidden="true" />
            <p className="mt-3 text-sm text-slate-400">{label}</p>
            <p className="mt-1 break-all font-semibold">{value}</p>
            {href && (
              <div className="mt-5 flex gap-2">
                <a href={href} className="shine block flex-1 rounded-lg bg-teal px-3 py-2 text-center text-sm font-semibold text-navy-950 transition hover:brightness-110">{cta}</a>
                <button onClick={() => copy(label, value)} aria-label={`Copy ${label.toLowerCase()}`} className="rounded-lg border border-white/20 p-2 transition hover:border-gold hover:text-gold"><Copy size={18} aria-hidden="true" /></button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="/Aslam_Alphonas_CV.pdf" download
        className="shine mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-soft px-7 py-3.5 font-semibold text-navy-950">
        <Download size={18} aria-hidden="true" />Download CV
      </motion.a>
      <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <AnimatePresence>
          {toast && (
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              className="flex items-center gap-2 rounded-full border border-teal/50 bg-navy-800 px-5 py-3 text-sm font-semibold shadow-xl">
              <Check size={16} className="text-teal-glow" aria-hidden="true" />{toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
