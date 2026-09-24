import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 40, x = 0, className, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SectionHead({ eyebrow, title, sub, center = false }) {
  return (
    <div className={center ? 'head-center' : undefined}>
      <Reveal as="span" className="eyebrow">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" className="heading" delay={0.08}>
        {title}
      </Reveal>
      {sub && (
        <Reveal as="p" className="heading-sub" delay={0.16}>
          {sub}
        </Reveal>
      )}
    </div>
  )
}

