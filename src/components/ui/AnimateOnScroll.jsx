import { useEffect, useRef, useState } from 'react'

const animationClass = {
  'fade-up': 'animate-fade-up',
  'fade-in': 'animate-fade-in',
  'slide-right': 'animate-slide-right',
  'slide-left': 'animate-slide-left',
  'scale-in': 'animate-scale-in',
  'bounce-in': 'animate-bounce-in',
  'rotate-in': 'animate-rotate-in',
  'drop-in': 'animate-drop-in',
}

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={`${visible ? animationClass[animation] : 'opacity-0'} h-full w-full min-w-0 ${className}`}
    >
      {children}
    </Tag>
  )
}
