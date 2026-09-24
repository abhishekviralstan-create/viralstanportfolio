import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHead, ease } from './Reveal'
import { projects } from '../data/content'

const bookEase = [0.645, 0.045, 0.355, 1]

function Folder({ p, i, onOpen }) {
  return (
    <motion.button
      className="folder"
      style={{ '--f1': p.colors[0], '--f2': p.colors[1] }}
      onClick={() => onOpen(i)}
      aria-label={`Open ${p.name} case study`}
      initial={{ opacity: 0, y: 70, rotate: i % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease }}
    >
      <span className="folder-back" />
      <span className="folder-paper">
        {p.logo ? <img src={p.logo} alt="" loading="lazy" /> : <span className="project-monogram">{p.name.slice(0, 2)}</span>}
      </span>
      <span className="folder-paper second" />
      <span className="folder-front">
        <span className="folder-no">{String(i + 1).padStart(2, '0')}</span>
        <span className="folder-name">{p.name}</span>
        <span className="folder-meta">{p.services.length} services · {p.industry}</span>
        <span className="folder-open">Open case study →</span>
      </span>
    </motion.button>
  )
}

function Book({ index, setIndex, onClose }) {
  const p = projects[index]
  const first = useRef(true)
  const scroller = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % projects.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + projects.length) % projects.length)
    }
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => (first.current = false), 1600)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [onClose, setIndex])

  useEffect(() => {
    setScrolled(false)
    if (scroller.current) scroller.current.scrollTop = 0
  }, [index])

  // On first open both pages unfold outward from the spine in the centre;
  // page content fades in once the pages are flat
  const pageDelay = first.current ? 0.9 : 0
  const unfold = (side) => {
    const dir = side === 'left' ? 1 : -1
    return mobile
      ? {
          style: { transformOrigin: side === 'left' ? 'center bottom' : 'center top' },
          initial: { rotateX: -90 * dir, opacity: 0 },
          animate: { rotateX: 0, opacity: 1 },
        }
      : {
          style: { transformOrigin: side === 'left' ? 'right center' : 'left center' },
          initial: { rotateY: 90 * dir, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
        }
  }
  const unfoldTransition = { duration: 1.05, delay: 0.25, ease: bookEase, opacity: { duration: 0.3, delay: 0.25 } }

  return (
    <motion.div className="book-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="book-close" onClick={onClose} aria-label="Close case study">
        ✕
      </button>

      <motion.div
        className="book"
        role="dialog"
        aria-modal="true"
        aria-label={`${p.name} case study`}
        style={{ '--f1': p.colors[0], '--f2': p.colors[1] }}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.7, ease }}
      >
        <span className="book-spine" aria-hidden="true" />
        {/* left page: scrollable website screenshot */}
        <motion.div className="page page-left" {...unfold('left')} transition={unfoldTransition}>
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              className="page-inner"
              initial={{ opacity: 0, x: first.current ? 0 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, delay: pageDelay }}
            >
              {p.image ? (
                <>
                  <div className="shot-frame" ref={scroller} onScroll={(e) => e.currentTarget.scrollTop > 40 && setScrolled(true)}>
                    <div className="shot-bar">
                      <i /><i /><i /><span>{p.name}</span>
                    </div>
                    <img src={p.image} alt={`${p.name} website designed by Viralstan`} />
                  </div>
                  <AnimatePresence>
                    {!scrolled && (
                      <motion.span className="scroll-hint" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: pageDelay + 0.6 } }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                        Scroll to explore the full site ↓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="brand-showcase">
                  <span className="brand-lines" aria-hidden="true" />
                  <div className="brand-mark">
                    {p.logo ? <img src={p.logo} alt={`${p.name} logo`} /> : <span>{p.name.slice(0, 2)}</span>}
                  </div>
                  <span className="brand-kicker">Viralstan × {p.name}</span>
                  <h4>{p.summary}</h4>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* right page: the story */}
        <motion.div className="page page-right" {...unfold('right')} transition={unfoldTransition}>
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              className="page-inner copy"
              initial={{ opacity: 0, rotateY: first.current ? 0 : -25, x: 20 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: 25, x: -20 }}
              transition={{ duration: 0.45, delay: pageDelay }}
            >
              <div className="book-logo">
                {p.logo ? <img src={p.logo} alt={`${p.name} logo`} /> : <span className="project-monogram">{p.name.slice(0, 2)}</span>}
              </div>
              <span className="book-eyebrow">{p.industry}</span>
              <h3>{p.name}</h3>
              <div className="book-tags">
                {p.services.map((s) => (
                  <span className="book-tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <p className="book-detail">{p.detail}</p>
              <h4>Project highlights</h4>
              <ul className="book-list">
                {p.highlights.map((h, i) => (
                  <motion.li key={h} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: pageDelay + 0.2 + i * 0.07 }}>
                    {h}
                  </motion.li>
                ))}
              </ul>
              {p.quote && (
                <blockquote className="book-quote">
                  “{p.quote}”<cite>— {p.name}</cite>
                </blockquote>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="book-foot">
            <button onClick={() => setIndex((i) => (i - 1 + projects.length) % projects.length)} aria-label="Previous case study">
              ←
            </button>
            <span>
              Case study {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <button onClick={() => setIndex((i) => (i + 1) % projects.length)} aria-label="Next case study">
              →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((fn) => setOpen((o) => (typeof fn === 'function' ? fn(o) : fn)), [])

  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead
          center
          eyebrow="Case Studies"
          title={
            <>
              Real brands. <span className="grad-text">Real results.</span>
            </>
          }
          sub="Every folder holds a real project. Click one to open the case study."
        />

        <div className="folder-grid">
          {projects.map((p, i) => (
            <Folder key={p.id} p={p} i={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Book index={open} setIndex={step} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  )
}
