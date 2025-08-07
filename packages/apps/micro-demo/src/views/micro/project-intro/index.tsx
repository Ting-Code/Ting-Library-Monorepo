import React from 'react'
import styles from './index.module.css'

const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: string
  title: string
  description: string
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.iconTitleContainer}>
        <div className={styles.iconContainer}>{icon}</div>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

const ProjectIntro = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ting Library 功能介绍</h1>
      <div className={styles.content}>
        <FeatureCard
          icon="📖"
          title="Ting Library 介绍"
          description="Ting Library 是一个功能全面的前端开发框架，提供了从工程化到UI组件的完整解决方案，帮助开发者快速构建高质量的前端应用。"
        />
        <FeatureCard
          icon="🛠️"
          title="工程化设计"
          description="采用现代化的工程化设计理念，集成了Rspack、TypeScript、ESLint等工具，提供标准化的开发流程和最佳实践。"
        />
        <FeatureCard
          icon="🧩"
          title="微前端"
          description="内置微前端解决方案，支持多框架集成和独立部署，轻松实现大型应用的模块化拆分和管理。"
        />
        <FeatureCard
          icon="🎨"
          title="CSS架构设计"
          description="提供完善的CSS架构设计，支持Tailwind CSS、CSS Modules等多种样式方案，确保样式的可维护性和扩展性。"
        />
        <FeatureCard
          icon="🗺️"
          title="可视化流程图"
          description="集成流程图可视化功能，支持节点拖拽、连线编辑等交互，帮助开发者直观地展示和设计系统架构。"
        />
        <FeatureCard
          icon="📊"
          title="数据图表"
          description="提供丰富的数据图表组件，支持折线图、柱状图、饼图等多种图表类型，满足各种数据可视化需求。"
        />
        <FeatureCard
          icon="🎞️"
          title="动画效果"
          description="内置动画库，提供丰富的过渡效果和动画组件，帮助开发者轻松实现流畅的用户体验。"
        />
        <FeatureCard
          icon="🗿"
          title="3D模型"
          description="集成3D模型展示功能，支持GLTF、OBJ等多种格式的3D模型加载和渲染，为应用增添沉浸式体验。"
        />
      </div>
    </div>
  )
}

export default ProjectIntro
