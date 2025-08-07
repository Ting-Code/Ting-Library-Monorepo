import React from 'react'

// 辅助函数：将hex颜色转换为rgb字符串
const hexToRgb = (hex) => {
  // 移除#前缀（如果存在）
  hex = hex.replace(/^#/, '')

  // 解析hex值
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r}, ${g}, ${b}`
}

// 统一的子应用卡片组件
const AppCard = ({
  icon,
  title,
  buildTool,
  description = '',
  tags,
  color
}: {
  icon: React.ReactNode
  title: string
  buildTool: string
  description: string
  tags: string[]
  color: string
}) => {
  return (
    <div
      style={{
        backgroundColor: '#1e1e2e',
        borderRadius: '20px',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #33334d',
        transition: 'all 0.3s ease',
        transform: 'translateY(0)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(8px)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)'
        e.currentTarget.style.boxShadow = `0 12px 24px rgba(${hexToRgb(color)}, 0.25)`
        e.currentTarget.style.borderColor = color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)'
        e.currentTarget.style.borderColor = '#33334d'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: `0 4px 12px rgba(${hexToRgb(color)}, 0.3)`
        }}
      >
        <span style={{ fontSize: '32px', color: 'white' }}>{icon}</span>
      </div>
      <h3
        style={{
          fontSize: '1.2rem',
          color: '#ffffff',
          marginBottom: '12px',
          fontWeight: 600,
          margin: 0
        }}
      >
        {title}
      </h3>
      <div
        style={{
          fontSize: '0.85rem',
          color: color,
          marginBottom: '20px',
          background: `rgba(${hexToRgb(color)}, 0.1)`,
          padding: '4px 10px',
          borderRadius: '6px',
          width: 'fit-content',
          fontWeight: 500
        }}
      >
        {buildTool}
      </div>
      <p
        style={{
          fontSize: '0.95rem',
          color: '#a5b4fc',
          lineHeight: '1.6',
          marginBottom: '15px',
          flexGrow: 1,
          wordBreak: 'break-word'
        }}
      >
        {description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              fontSize: '0.75rem',
              color: '#c4b5fd',
              backgroundColor: '#2d2d4a',
              padding: '4px 10px',
              borderRadius: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = color
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2d2d4a'
              e.currentTarget.style.color = '#c4b5fd'
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

const MicroAppDemo = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #121212 0%, #000000 100%)',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}
    >
      <div
        style={{
          backgroundColor: '#1e1e1e',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          padding: '40px',
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          transition: 'transform 0.3s ease'
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '10px',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          微前端架构
        </h1>

        <div style={{ marginTop: '30px' }}>
          <p
            style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '25px' }}
          >
            以下是基于 Microapp 微前端架构实现的独立子应用，每个子应用可独立开发、部署和运行。
          </p>

          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '30px',
              paddingBottom: '20px',
              paddingTop: '10px'
            }}
          >
            {/* 统一的子应用卡片组件 */}
            <AppCard
              icon="⚛️"
              title="React 子应用"
              buildTool="Rspack 构建"
              description="基于 Rspack 构建的高性能 React 子应用，采用 TypeScript 开发，享受极速编译体验。"
              tags={['React', 'TypeScript', 'Rspack']}
              color="#10b981"
            />

            <AppCard
              icon="📚"
              title="文档子应用"
              buildTool="Vite 构建 Vue3"
              description="基于 Vite 构建的 Vue3 文档子应用，提供可直达源码的直观文档，支持代码演示和实时预览。"
              tags={['Vue3', 'Vite', '文档']}
              color="#3b82f6"
            />

            <AppCard
              icon="⚡"
              title="Next.js 子应用"
              buildTool="Next.js 构建"
              description="基于 Next.js 构建的服务端渲染子应用，提供优秀的 SEO 支持和服务器端渲染能力。"
              tags={['Next.js', 'React', 'SSR']}
              color="#f97316"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MicroAppDemo
