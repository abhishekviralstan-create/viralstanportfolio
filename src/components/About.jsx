import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, SectionHead, ease } from './Reveal'
import Icon from './Icons'
import { pillars } from '../data/content'

const statement =
  'We bring together creative thinking, performance marketing and technology to make ambitious brands visible, trusted and profitable.'

// Each word brightens as the paragraph scrolls through the viewport
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <span className="ww-word">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  )
}

export function WhoWeAre() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = statement.split(' ')
  const facts = [
    { icon: 'pin', label: 'Built in India' },
    { icon: 'users', label: 'One accountable team' },
    { icon: 'map', label: 'Serving brands globally' },
  ]

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead
          eyebrow="Who we are"
          title={
            <>
              Ideas, creativity and technology <span className="grad-text">working as one.</span>
            </>
          }
        />

        <div className="ww-grid">
          <p className="ww-statement" ref={ref}>
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>

          <div>
            <Reveal as="p" className="ww-text">
              Viralstan is a strategy-led digital growth agency from India. We started with a simple goal: make effective digital
              marketing accessible to every ambitious business, not just large brands.
            </Reveal>
            <Reveal as="p" className="ww-text" delay={0.1}>
              SEO experts, paid media strategists, designers and developers work under one roof, so clients get one accountable team
              instead of scattered freelancers.
            </Reveal>
            <div className="ww-facts">
              {facts.map((f, i) => (
                <Reveal className="ww-fact" key={f.label} delay={0.15 + i * 0.08} x={30} y={0}>
                  <i>
                    <Icon name={f.icon} />
                  </i>
                  {f.label}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MissionVision() {
  const icons = { Mission: 'target', Vision: 'eye' }
  return (
    <section className="section mv" id="mission">
      <div className="container">
        <SectionHead
          center
          eyebrow="Our mission & vision"
          title={
            <>
              What drives us <span className="grad-text">every day.</span>
            </>
          }
        />
        <div className="mv-grid">
          {pillars.map((p, i) => (
            <motion.article
              key={p.label}
              className="mv-card"
              style={{ '--g': p.grad }}
              initial={{ opacity: 0, y: 60, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.15, ease }}
              whileHover={{ y: -8 }}
            >
              <span className="mv-glow" />
              <motion.span
                className="mv-icon"
                initial={{ scale: 0, rotate: -120 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 + i * 0.15 }}
              >
                <Icon name={icons[p.label]} />
              </motion.span>
              <span className="mv-label">Our {p.label}</span>
              <p>{p.text}</p>
              <span className="mv-num">0{i + 1}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
