import { motion } from 'framer-motion'
import { GraduationCap, Languages } from 'lucide-react'
import { Section, Reveal } from './ui'
import { education, languages } from '../data'

export default function Education() {
  return (
    <Section id="education" title="Education & languages">
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal x={-30}>
          <div className="card card-hover h-full p-6">
            <h3 className="flex items-center gap-3 font-display text-xl font-bold"><GraduationCap className="text-teal-glow" aria-hidden="true" />Education</h3>
            <ul className="mt-5 space-y-4">
              {education.map((e) => (
                <li key={e.degree}><p className="font-semibold">{e.degree}</p><p className="text-slate-300">{e.school}</p></li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal x={30}>
          <div className="card card-hover h-full p-6">
            <h3 className="flex items-center gap-3 font-display text-xl font-bold"><Languages className="text-teal-glow" aria-hidden="true" />Languages</h3>
            <ul className="mt-5 space-y-3">
              {languages.map(([l, lvl], i) => (
                <li key={l} className="flex justify-between border-b border-white/10 pb-2"><span className="font-semibold">{l}</span><span className="text-slate-300">{lvl}</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
