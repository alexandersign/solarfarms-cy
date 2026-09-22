'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { type ReactNode } from 'react'

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'stagger'

const animations: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
}

const noAnimation: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
}

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  const variants = shouldReduceMotion ? noAnimation : animations[animation]
  const transition = shouldReduceMotion ? { duration: 0 } : { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView || shouldReduceMotion ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView || shouldReduceMotion ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      variants={shouldReduceMotion ? noAnimation : animations.stagger}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface CountUpProps {
  end: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({ end, suffix = '', prefix = '', className = '' }: CountUpProps) {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      animate={inView || shouldReduceMotion ? { opacity: 1 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      {prefix}{end.toLocaleString()}{suffix}
    </motion.span>
  )
}
