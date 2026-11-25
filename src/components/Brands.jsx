import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from './ui'
import { brands } from '../data'

export default function Brands() {
  const [filter, setFilter] = useState('All')
  const tabs = ['All', ...brands.map((b) => b.group)]
  const shown = filter === 'All' ? brands : brands.filter((b) => b.group === filter)

  return (
    <Section id="brands" alt title="Technology brands" intro="Principals and technology partners across audio, collaboration, display and control. Pick a category to filter.">
      <div role="tablist" aria-label="Brand categories" className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={filter === t} onClick={() => setFilter(t)}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${filter === t ? 'text-navy-950' : 'border border-white/20 text-slate-300 hover:border-teal'}`}>
            {filter === t && <motion.span layoutId="brand-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-teal to-turq" />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((b) => (
            <motion.div layout key={b.group} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              className={`card p-6 ${shown.length === 1 ? 'md:col-span-2' : ''}`}>
              <h3 className="font-display text-xl font-bold text-gold-soft">{b.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {b.items.map((i, k) => (
                  <motion.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.04 }} whileHover={{ y: -3, scale: 1.06 }}
                    className="cursor-default rounded-lg border border-teal/30 bg-navy-900 px-4 py-2 text-sm font-semibold tracking-wide transition-colors hover:border-turq hover:text-turq">{i}</motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
