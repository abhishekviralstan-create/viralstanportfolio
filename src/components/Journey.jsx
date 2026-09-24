import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { SectionHead, ease } from './Reveal'
import Icon from './Icons'
import { story } from '../data/content'

const BADGE_OUT = 34 // how far the round badge sticks out of its card

// Builds one S-curve per step: from the badge on a card's edge, swinging
// outwards and down, ending tucked behind the top of the next card.
function buildPath(wrap, cards) {
  const w = wrap.getBoundingClientRect()
  let d = ''
  for (let i = 0; i < cards.length - 1; i++) {
    const a = cards[i].getBoundingClientRect()
    const b = cards[i + 1].getBoundingClientRect()
    const dir = i % 2 === 0 ? 1 : -1 // even cards sit left, badge on the right edge
    const sx = (dir === 1 ? a.right : a.left) - w.left
    const sy = a.top + a.height / 2 - w.top
    const ex = sx + dir * 90
    const ey = b.top - w.top + 20
    d += `M ${sx} ${sy} C ${sx + dir * 140} ${sy + 6}, ${ex + dir * 110} ${ey - 70}, ${ex} ${ey} `
  }
  return d
}

export default function Journey() {
  const wrap = useRef(null)
  const cards = useRef([])
  const pathRef = useRef(null)
  const [d, setD] = useState('')
  const [dot, setDot] = useState(null)

  useLayoutEffect(() => {
    const update = () => wrap.current && setD(buildPath(wrap.current, cards.current.filter(Boolean)))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [])

  // The road draws itself as you scroll, with a glowing dot riding its tip
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 65%', 'end 70%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  useMotionValueEvent(draw, 'change', (v) => {
    const p = pathRef.current
    if (!p || !d) return
    if (v <= 0.001 || v >= 0.999) return setDot(null)
    const pt = p.getPointAtLength(p.getTotalLength() * v)
    setDot({ x: pt.x, y: pt.y })
  })

  const icons = ['pin', 'users', 'map', 'chart']

  return (
    <section className="section" id="journey">
      <div className="container">
        <SectionHead
          center
          eyebrow="Our company journey"
          title={
            <>
              From India <span className="grad-text">to global.</span>
            </>
          }
          sub="How Viralstan grew into a digital growth partner for ambitious brands across markets."
        />

        <div className="roadmap" ref={wrap}>
          <svg className="road-svg" aria-hidden="true">
            <defs>
              <linearGradient id="road-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#315eea" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <path d={d} className="road-track" />
            <motion.path ref={pathRef} d={d} className="road-line" style={{ pathLength: draw }} />
            {dot && <circle cx={dot.x} cy={dot.y} r="7" className="road-dot" />}
          </svg>

          {story.map((s, i) => {
            const left = i % 2 === 0
            return (
              <motion.article
                key={s.year}
                ref={(el) => (cards.current[i] = el)}
                className={`road-card ${left ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: left ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -120px 0px' }}
                transition={{ duration: 0.9, ease }}
                whileHover={{ y: -6 }}
              >
                <span className="road-step">Milestone {s.year}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <motion.span
                  className="road-badge"
                  style={{ [left ? 'right' : 'left']: -BADGE_OUT }}
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '0px 0px -120px 0px' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.35 }}
                >
                  <Icon name={icons[i]} />
                </motion.span>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
