import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import * as Icons from 'lucide-react'

export const Icon = ({ name, ...p }) => {
  const C = Icons[name] || Icons.Circle
  return <C aria-hidden="true" {...p} />
}

/* Shared animation variants */
export const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
export const itemV = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] } },
}
export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }

export function Reveal({ children, delay = 0, className = '', x = 0 }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28, x }} whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

export function Section({ id, title, intro, children, alt }) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${alt ? 'bg-navy-950/60' : ''}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
          <motion.div className="mt-4 h-1 rounded bg-gold" initial={{ width: 0 }} whileInView={{ width: 64 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          {intro && <p className="mt-5 max-w-2xl text-lg text-slate-300">{intro}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const c = animate(0, value, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [seen, value])
  return <span ref={ref}>{n}{suffix}</span>
}
