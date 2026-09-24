import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { SectionHead } from './Reveal'
import Icon from './Icons'
import { services } from '../data/content'

// Each card is sticky; as later cards scroll over it, it shrinks and dims,
// producing a "deck of cards" stack.
function StackCard({ s, i, total, progress }) {
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.035])
  const brightness = useTransform(progress, [start, Math.min(1, start + 0.35)], [1, i === total - 1 ? 1 : 0.9])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <div className="stack-card-wrap" style={{ top: `calc(60px + ${i * 14}px)` }}>
      <motion.article
        className="stack-card"
        style={{ scale, filter, '--c': s.color }}
        initial={{ opacity: 0, y: 80, rotateX: -12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sc-top">
          <motion.div className="sc-icon" whileHover={{ rotate: -10, scale: 1.08 }}>
            <Icon name={s.icon} />
          </motion.div>
          <span className="sc-no">{s.no}</span>
        </div>
        <span className="sc-kicker">{s.kicker}</span>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
        <div className="tags">
          {s.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length))))
  })

  return (
    <section className="section services" id="services">
      <div className="container services-layout">
        <div className="services-intro">
          <SectionHead
            eyebrow="What we offer"
            title={
              <>
                Everything your brand needs <span className="grad-text">to grow.</span>
              </>
            }
            sub="A full range of digital marketing services under one roof, so you work with one accountable team from strategy to reporting."
          />
          <div className="services-count" aria-hidden="true">
            <motion.b key={active} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grad-text">
              {services[active].no}
            </motion.b>
            <span>/ 0{services.length}</span>
          </div>
          <div className="services-dots" aria-hidden="true">
            {services.map((s, i) => (
              <i key={s.no} className={i === active ? 'on' : ''} />
            ))}
          </div>
        </div>

        <div ref={ref}>
          {services.map((s, i) => (
            <StackCard key={s.no} s={s} i={i} total={services.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
