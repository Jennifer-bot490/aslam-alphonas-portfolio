import { motion } from 'framer-motion'
import { Section, Icon, container, itemV, inView } from './ui'
import { skills } from '../data'

export default function Expertise() {
  return (
    <Section id="expertise" title="Core expertise">
      <motion.ul variants={container} {...inView} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(([icon, label]) => (
          <motion.li key={label} variants={itemV} whileHover={{ scale: 1.03 }} className="card card-hover group flex items-center gap-4 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/15 text-teal-glow transition duration-300 group-hover:rotate-6 group-hover:bg-teal group-hover:text-navy-950"><Icon name={icon} size={24} /></span>
            <span className="font-semibold">{label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
