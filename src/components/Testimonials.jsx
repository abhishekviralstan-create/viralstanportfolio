import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHead } from './Reveal'
import { testimonials } from '../data/content'

const initials = (name) =>
  name
    .replace(/[^A-Za-z ]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

// Shortest signed distance on a ring, so the carousel loops seamlessly
const offset = (i, active, n) => {
  let d = i - active
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = testimonials.length
  const go = (d) => setActive((a) => (a + d + n) % n)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(1), 5000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused])

  return (
    <section className="section" id="testimonials" style={{ overflow: 'hidden' }}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Client testimonials"
          title={
            <>
              Trusted by <span className="grad-text">100+ clients.</span>
            </>
          }
          sub="Real words from businesses and creators who partnered with Viralstan. Drag, click or use the arrows."
        />

        <div className="coverflow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {testimonials.map((t, i) => {
            const d = offset(i, active, n)
            const abs = Math.abs(d)
            return (
              <motion.figure
                key={t.name + i}
                className="cf-card"
                style={{ zIndex: 20 - abs }}
                animate={{
                  x: `${d * 62}%`,
                  rotateY: d * -28,
                  scale: 1 - abs * 0.13,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.3,
                  filter: `blur(${abs * 1.5}px)`,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => d !== 0 && setActive(i)}
                drag={d === 0 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                aria-hidden={d !== 0}
              >
                <div className="cf-head">
                  <span className="avatar">{initials(t.name)}</span>
                  <div>
                    <b>{t.name}</b>
                    <small>{t.role}</small>
                  </div>
                </div>
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote style={{ margin: 0 }}>
                  <p>&ldquo;{t.text}&rdquo;</p>
                </blockquote>
              </motion.figure>
            )
          })}
        </div>

        <div className="cf-controls">
          <button className="arrow-btn" onClick={() => go(-1)} aria-label="Previous testimonial">
            &larr;
          </button>
          <div className="cf-dots">
            {testimonials.map((t, i) => (
              <button key={i} className={i === active ? 'on' : ''} onClick={() => setActive(i)} aria-label={`Show testimonial ${i + 1}`} />
            ))}
          </div>
          <button className="arrow-btn" onClick={() => go(1)} aria-label="Next testimonial">
            &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
