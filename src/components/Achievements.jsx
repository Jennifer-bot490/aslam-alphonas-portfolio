import { motion } from 'framer-motion'
import { Section, Icon, container, itemV, inView } from './ui'
import { achievements } from '../data'

export default function Achievements() {
  return (
    <Section id="achievements" alt title="Key achievements">
      <motion.div variants={container} {...inView} className="grid gap-6 md:grid-cols-2">
        {achievements.map((a) => (
          <motion.div key={a.text} variants={itemV} className="card card-hover flex gap-5 p-6">
            <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Icon name={a.icon} /></motion.span>
            <p className="text-slate-200">{a.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
