import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { SectionHead, ease } from './Reveal'
import { reelFilters, reels } from '../data/content'

const src = (id, ext) => `/reels/${id}.${ext}`

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

// A reel plays muted while it is on screen and pauses when it leaves
function ReelCard({ r, i, onOpen, paused }) {
  const video = useRef(null)
  const card = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.55 })
    io.observe(card.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (visible && !paused) v.play().catch(() => {})
    else v.pause()
  }, [visible, paused])

  return (
    <motion.button
      ref={card}
      layout
      className={`reel ${visible ? 'is-playing' : ''}`}
      onClick={() => onOpen(r)}
      aria-label={`Watch ${r.title} by ${r.client}`}
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease }}
      whileHover={{ y: -10 }}
    >
      <span className="reel-media">
        <video ref={video} src={src(r.id, 'mp4')} poster={src(r.poster || r.id, 'jpg')} muted loop playsInline preload="metadata" />
        <span className="reel-shade" />
        <span className="reel-cat">{r.category}</span>
        <span className="reel-play" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="reel-bars" aria-hidden="true"><i /><i /><i /></span>
      </span>
      <span className="reel-info">
        <b>{r.client}</b>
        <small>{r.title}</small>
      </span>
    </motion.button>
  )
}

function Player({ list, index, setIndex, onClose }) {
  const r = list[index]
  const go = useCallback((d) => setIndex((i) => (i + d + list.length) % list.length), [list.length, setIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [go, onClose])

  return (
    <motion.div className="player-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="player-close" onClick={onClose} aria-label="Close video">
        ✕
      </button>
      <button className="player-nav prev" onClick={(e) => (e.stopPropagation(), go(-1))} aria-label="Previous video">
        ←
      </button>

      <motion.div
        className="player"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <AnimatePresence mode="wait">
          <motion.video
            key={r.id}
            src={src(r.id, 'mp4')}
            poster={src(r.poster || r.id, 'jpg')}
            controls
            autoPlay
            playsInline
            initial={{ opacity: 0, rotateY: 25 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -25 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
        <div className="player-meta">
          <span>{r.category}</span>
          <b>{r.title}</b>
          <small>
            {r.client} · {index + 1} / {list.length}
          </small>
        </div>
      </motion.div>

      <button className="player-nav next" onClick={(e) => (e.stopPropagation(), go(1))} aria-label="Next video">
        →
      </button>
    </motion.div>
  )
}

export default function Reels() {
  const mobile = useIsMobile()
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const list = filter === 'All' ? reels : reels.filter((r) => r.category === filter)

  // Desktop: the section pins and vertical scroll drives the reels sideways
  const outer = useRef(null)
  const viewport = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return
      setDistance(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    ro.observe(viewport.current)
    return () => ro.disconnect()
  }, [filter, mobile])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const x = useTransform(smooth, (v) => -v * distance)
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(smooth, 'change', setProgress)

  const openReel = (r) => setOpen(list.findIndex((x) => x.id === r.id))
  const close = useCallback(() => setOpen(null), [])

  const header = (
    <div className="container reels-head">
      <SectionHead
        eyebrow="Video portfolio"
        title={
          <>
            Reels that <span className="grad-text">stop the scroll.</span>
          </>
        }
        sub="Property shoots, brand ads and web series we produced. Scroll to play, click to watch with sound."
      />
      <div className="filters" role="tablist" aria-label="Filter videos">
        {reelFilters.map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
            {filter === f && <motion.span layoutId="reel-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span>{f}</span>
          </button>
        ))}
      </div>
    </div>
  )

  const cards = (
    <AnimatePresence>
      {list.map((r, i) => (
        <ReelCard key={r.id} r={r} i={i} onOpen={openReel} paused={open !== null} />
      ))}
    </AnimatePresence>
  )

  return (
    <section className="reels-section" id="videos">
      {mobile ? (
        <div className="section">
          {header}
          <div className="reels-swipe" ref={viewport}>
            <div className="reels-track" ref={track}>
              {cards}
            </div>
          </div>
        </div>
      ) : (
        <div ref={outer} style={{ height: `calc(100vh + ${distance}px)` }}>
          <div className="reels-sticky">
            {header}
            <div className="reels-viewport" ref={viewport}>
              <motion.div className="reels-track" ref={track} style={{ x }}>
                {cards}
              </motion.div>
            </div>
            <div className="container reels-progress">
              <span className="rp-bar">
                <i style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
              </span>
              <span className="rp-hint">{progress < 0.98 ? 'Keep scrolling →' : 'That’s a wrap ✦'}</span>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>{open !== null && <Player list={list} index={open} setIndex={setOpen} onClose={close} />}</AnimatePresence>
    </section>
  )
}
