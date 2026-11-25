import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Section, Reveal } from './ui'
import { experience } from '../data'

export default function Experience() {
  const [open, setOpen] = useState(new Set([0]))
  const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })
  const allOpen = open.size === experience.length

  return (
    <Section id="experience" alt title="Professional experience" intro="From projector sales in 2000 to leading corporate AV accounts today. Select a role to see what it involved.">
      <button onClick={() => setOpen(allOpen ? new Set() : new Set(experience.map((_, i) => i)))}
        className="mb-8 rounded-lg border border-teal/40 px-4 py-2 text-sm font-semibold text-teal-glow transition hover:bg-teal/10">
        {allOpen ? 'Collapse all roles' : 'Expand all roles'}
      </button>
      <div className="relative ml-3 sm:ml-6">
        <motion.div className="absolute -left-px top-0 h-full w-0.5 origin-top bg-gradient-to-b from-gold via-teal to-teal/10" aria-hidden="true"
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} />
        <ol>
          {experience.map((e, i) => {
            const isOpen = open.has(i)
            return (
              <li key={e.role + e.period} className="relative pb-8 pl-8 last:pb-0 sm:pl-12">
                <span className="absolute -left-[9px] top-6 h-4 w-4">
                  {i === 0 && <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" aria-hidden="true" />}
                  <span className={`absolute inset-0 rounded-full border-2 transition ${isOpen ? 'border-gold bg-gold' : 'border-teal bg-navy-900'}`} />
                </span>
                <Reveal x={30} delay={i * 0.05}>
                  <div className={`card ${isOpen ? 'border-teal/50' : 'card-hover'}`}>
                    <button className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6" aria-expanded={isOpen} aria-controls={`exp-${i}`} onClick={() => toggle(i)}>
                      <span>
                        <span className="block text-sm font-semibold text-gold-soft">{e.period}{i === 0 && <span className="ml-2 rounded-full bg-teal/20 px-2 py-0.5 text-xs text-teal-glow">Current role</span>}</span>
                        <span className="mt-1 block font-display text-xl font-bold sm:text-2xl">{e.role}</span>
                        <span className="block text-slate-300">{e.company}</span>
                      </span>
                      <ChevronDown className={`shrink-0 text-teal-glow transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div id={`exp-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <ul className="space-y-2 px-5 pb-6 text-slate-300 sm:px-6">
                            {e.points.map((p, k) => (
                              <motion.li key={p} initial={{ x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.08 + k * 0.06 }} className="flex gap-3">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-glow" />{p}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
