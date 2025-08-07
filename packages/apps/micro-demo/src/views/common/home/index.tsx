import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { microRouters } from '@/router/modules/micro'

// 路由项组件
const RouteItem: React.FC<{
  route: (typeof microRouters)[0]
  index: number
}> = ({ route, index }) => {
  const title = route.meta?.title || route.path
  const description = route.meta?.description || '未定义'

  return (
    <div key={index} className={styles.linkContainer}>
      <div className={styles.pathDisplay}>路径: {route.path}</div>
      <div className={styles.pathTitle}>标题: {title}</div>
      <div className={styles.pathDescription}>说明: {description}</div>
      <Link to={route.path!} className={styles.homeLink}>
        跳转到 {title}
      </Link>
    </div>
  )
}

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>路由导航</h1>
      <div className={styles.routesList}>
        {microRouters.map((route, index) => (
          <RouteItem key={index} route={route} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Home
