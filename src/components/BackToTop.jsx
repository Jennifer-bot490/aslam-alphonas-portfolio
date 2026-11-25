import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#home" aria-label="Back to top" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} whileHover={{ y: -4 }}
          className="fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-teal to-turq text-navy-950 shadow-lg shadow-teal/30">
          <ArrowUp aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
