import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { Section, Icon, Reveal, container, itemV, inView } from './ui'
import { certs } from '../data'

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications & training">
      <Reveal>
        <p className="mb-10 inline-flex items-center gap-3 rounded-xl border border-gold/50 bg-gold/10 px-5 py-3 font-semibold text-gold-soft">
          <BadgeCheck aria-hidden="true" /> The CV lists 16 product and technology certifications
        </p>
      </Reveal>
      <motion.div variants={container} {...inView} className="grid gap-6 md:grid-cols-2">
        {certs.map((c) => (
          <motion.div key={c.group} variants={itemV} className="card card-hover p-6">
            <h3 className="flex items-center gap-3 font-display text-xl font-bold"><Icon name={c.icon} className="text-teal-glow" />{c.group}</h3>
            <ul className="mt-4 space-y-2 text-slate-300">
              {c.items.map((i) => (
                <li key={i} className="flex gap-3"><BadgeCheck size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />{i}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
