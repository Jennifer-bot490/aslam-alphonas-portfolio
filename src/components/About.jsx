import { motion } from 'framer-motion'
import { Section, Counter, Reveal, container, itemV, inView } from './ui'
import { stats, profile } from '../data'

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3" x={-30}>
          <p className="text-lg leading-8 text-slate-200">{profile.summary}</p>
          <ul className="mt-8 grid gap-3 text-slate-300 sm:grid-cols-2">
            {['Enterprise AV solutions', 'Digital signage and collaboration', 'Video conferencing and projection', 'Key account management', 'Solution consultancy and system design', 'Bid preparation and post-sales support'].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{t}</li>
            ))}
          </ul>
        </Reveal>
        <motion.div variants={container} {...inView} className="grid grid-cols-2 gap-4 lg:col-span-2">
          {stats.map((s) => (
            <motion.div key={s.label} variants={itemV} className="card card-hover p-5">
              <div className="font-display text-4xl font-extrabold text-teal-glow"><Counter value={s.value} suffix={s.suffix} /></div>
              <p className="mt-2 text-sm text-slate-300">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
