import React, { FC, ReactNode } from 'react'

const Application: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export { Application }
