import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import React, { useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

export const TransitionLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  console.log(map.current)
  const transitions = useTransition(location.pathname, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 }
  })
  return transitions((style, pathname) => {
    console.log(map.current[pathname])
    return (
      <animated.div key={pathname} style={style}>
        {map.current[location.pathname]}
      </animated.div>
    )
  })
}
