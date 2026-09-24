import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Intro timeline (ms): welcome note → logo icon zooms out → site starts
const WELCOME_END = 2300
const LOGO_END = 3600
export const INTRO_DONE = 4.0 // seconds; hero animations start from here

const ease = [0.22, 1, 0.36, 1]
const word = 'Viralstan'

export default function Intro() {
  const [phase, setPhase] = useState('welcome')

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'hidden'
    const t1 = setTimeout(() => setPhase('logo'), WELCOME_END)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.documentElement.style.overflow = ''
    }, LOGO_END)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="intro"
          key="intro"
          exit={{ opacity: 0, transition: { duration: 0.6, ease } }}
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            {phase === 'welcome' ? (
              <motion.div
                key="welcome"
                className="intro-welcome"
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)', transition: { duration: 0.45 } }}
              >
                <motion.span
                  className="intro-hello"
                  initial={{ opacity: 0, y: 14, letterSpacing: '0.7em' }}
                  animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
                  transition={{ duration: 0.9, ease }}
                >
                  Welcome to
                </motion.span>
                <h1 className="intro-word">
                  {word.split('').map((ch, i) => (
                    <span className="intro-mask" key={i}>
                      <motion.span
                        className={i === 0 ? 'intro-v' : i >= 5 ? 'intro-s' : undefined}
                        initial={{ y: '110%', rotate: 8 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 + i * 0.06, ease }}
                      >
                        {ch}
                      </motion.span>
                    </span>
                  ))}
                </h1>
                <motion.span
                  className="intro-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1, ease }}
                />
              </motion.div>
            ) : (
              <motion.img
                key="logo"
                src="/logoicon.png"
                alt=""
                className="intro-icon"
                initial={{ scale: 5, opacity: 0, rotate: -120, filter: 'blur(16px)' }}
                animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={{ scale: 0.4, opacity: 0, transition: { duration: 0.4 } }}
                transition={{ duration: 1.1, ease }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
