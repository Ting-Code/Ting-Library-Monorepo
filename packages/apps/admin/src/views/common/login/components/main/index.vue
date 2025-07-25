<template>
  <el-container :class="ns.b()">
    <!-- 导航栏 -->
    <el-header :class="ns.e('header')">
      <div :class="ns.e('logo')">
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" stroke="#4096ff" stroke-width="2" />
          <path d="M30 50L45 35L60 50L45 65L30 50Z" fill="#4096ff" />
          <circle cx="70" cy="50" r="8" fill="#4096ff" />
        </svg>
        <span :class="ns.e('logo-text')">Ting Library</span>
      </div>
      <el-menu
        :class="ns.e('menu')"
        mode="horizontal"
        background-color="transparent"
        text-color="#606266"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">文档</el-menu-item>
        <el-menu-item index="3">组件</el-menu-item>
        <el-menu-item index="4">关于</el-menu-item>
      </el-menu>
      <el-button type="primary" size="small" @click="handleLogin">开始使用</el-button>
    </el-header>

    <!-- 主要内容 -->
    <el-main :class="ns.e('main')">
      <!-- 英雄区域 -->
      <section :class="ns.e('hero')">
        <div :class="ns.e('hero-content')">
          <h1 :class="ns.e('hero-title')">构建高效、优雅的前端应用</h1>
          <p :class="ns.e('hero-desc')"
            >Ting Library 提供丰富的组件和工具，帮助开发者快速构建高质量的 Web 应用</p
          >
          <div :class="ns.e('hero-actions')">
            <el-button type="primary" size="large" @click="handleLogin">
              快速开始
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="margin-left: 8px"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </el-button>
            <el-button size="large" @click="handleLogin">查看文档</el-button>
          </div>
        </div>
        <div :class="ns.e('hero-image')">
          <svg
            width="500"
            height="300"
            viewBox="0 0 500 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="50"
              y="50"
              width="150"
              height="100"
              rx="8"
              fill="#f0f7ff"
              stroke="#4096ff"
              stroke-width="2"
            />
            <rect
              x="250"
              y="80"
              width="150"
              height="100"
              rx="8"
              fill="#f0f7ff"
              stroke="#4096ff"
              stroke-width="2"
            />
            <rect
              x="100"
              y="180"
              width="150"
              height="60"
              rx="8"
              fill="#f0f7ff"
              stroke="#4096ff"
              stroke-width="2"
            />
            <rect
              x="300"
              y="50"
              width="100"
              height="60"
              rx="8"
              fill="#f0f7ff"
              stroke="#4096ff"
              stroke-width="2"
            />
            <circle cx="420" cy="220" r="30" fill="#f0f7ff" stroke="#4096ff" stroke-width="2" />
            <path
              d="M200 100L250 130"
              stroke="#4096ff"
              stroke-width="2"
              stroke-dasharray="5 5"
              stroke-linecap="round"
            />
            <path
              d="M175 180L250 130"
              stroke="#4096ff"
              stroke-width="2"
              stroke-dasharray="5 5"
              stroke-linecap="round"
            />
            <path
              d="M325 130L400 220"
              stroke="#4096ff"
              stroke-width="2"
              stroke-dasharray="5 5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </section>

      <!-- 特性区域 -->
      <section :class="ns.e('features')">
        <h2 :class="ns.e('section-title')">核心特性</h2>
        <el-row :gutter="30">
          <el-col :span="8">
            <div :class="ns.e('feature-card')">
              <div :class="ns.e('feature-icon')">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#4096ff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#4096ff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#4096ff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 :class="ns.e('feature-title')">丰富组件</h3>
              <p :class="ns.e('feature-desc')"
                >超过 50 个精心设计的 UI 组件，满足各类业务需求，组件化开发提高效率</p
              >
            </div>
          </el-col>
          <el-col :span="8">
            <div :class="ns.e('feature-card')">
              <div :class="ns.e('feature-icon')">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    points="23 6 13.5 15.5 8.5 10.5 1 18"
                    stroke="#4096ff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <polyline
                    points="17 6 23 6 23 12"
                    stroke="#4096ff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 :class="ns.e('feature-title')">高效工具</h3>
              <p :class="ns.e('feature-desc')"
                >内置实用工具函数，处理常见开发场景，减少重复工作，提高开发效率</p
              >
            </div>
          </el-col>
          <el-col :span="8">
            <div :class="ns.e('feature-card')">
              <div :class="ns.e('feature-icon')">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="#4096ff" stroke-width="2" />
                  <polyline
                    points="12 6 12 12 16 14"
                    stroke="#4096ff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 :class="ns.e('feature-title')">灵活扩展</h3>
              <p :class="ns.e('feature-desc')"
                >支持自定义主题与组件扩展，轻松适配不同项目风格，满足个性化需求</p
              >
            </div>
          </el-col>
        </el-row>
      </section>

      <!-- 技术栈区域 -->
      <section :class="ns.e('tech-stack')">
        <h2 :class="ns.e('section-title')">技术栈</h2>
        <div :class="ns.e('tech-logos')">
          <div :class="ns.e('tech-logo')">Vue</div>
          <div :class="ns.e('tech-logo')">React</div>
          <div :class="ns.e('tech-logo')">TypeScript</div>
          <div :class="ns.e('tech-logo')">SCSS</div>
          <div :class="ns.e('tech-logo')">Vite</div>
        </div>
      </section>
    </el-main>

    <!-- 页脚 -->
    <el-footer :class="ns.e('footer')">
      <div :class="ns.e('footer-content')">
        <p>© 2023 Ting Library. 保留所有权利。</p>
        <div :class="ns.e('social-links')">
          <a href="#" :class="ns.e('social-link')">GitHub</a>
          <a href="#" :class="ns.e('social-link')">文档</a>
          <a href="#" :class="ns.e('social-link')">社区</a>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
  import { useNamespace, loginSystem } from '@tingcode/system'

  defineOptions({
    name: 'LoginMain'
  })

  const handleLogin = () => {
    loginSystem()
  }

  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @include b(login-main) {
    display: flex;
    flex-direction: column;
    background-color: #f5f7fa;

    @include e(header) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      height: 64px;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 100;

      @include e(logo) {
        display: flex;
        align-items: center;
        cursor: pointer;

        @include e(logo-text) {
          margin-left: 8px;
          font-size: 18px;
          font-weight: 600;
          color: #1d2129;
        }
      }

      @include e(menu) {
        flex: 1;
        margin: 0 40px;
      }
    }

    @include e(main) {
      flex: 1;
      padding: 0;
      background-color: transparent;
    }

    @include e(hero) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 80px 40px;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf5 100%);

      @include e(hero-content) {
        flex: 1;
        max-width: 50%;

        @include e(hero-title) {
          font-size: 42px;
          font-weight: 700;
          color: #1d2129;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        @include e(hero-desc) {
          font-size: 18px;
          color: #4e5969;
          margin-bottom: 40px;
          line-height: 1.5;
        }

        @include e(hero-actions) {
          display: flex;
          gap: 16px;
        }
      }

      @include e(hero-image) {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }

    @include e(features) {
      padding: 80px 40px;
      max-width: 1200px;
      margin: 0 auto;

      @include e(section-title) {
        font-size: 32px;
        font-weight: 700;
        color: #1d2129;
        margin-bottom: 40px;
        text-align: center;
      }

      @include e(feature-card) {
        padding: 32px;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        transition: all 0.3s ease;
        height: 100%;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
      }

      @include e(feature-icon) {
        margin-bottom: 24px;
      }

      @include e(feature-title) {
        font-size: 20px;
        font-weight: 600;
        color: #1d2129;
        margin-bottom: 12px;
      }

      @include e(feature-desc) {
        font-size: 14px;
        color: #4e5969;
        line-height: 1.6;
      }
    }

    @include e(tech-stack) {
      padding: 60px 40px;
      background-color: #ffffff;

      @include e(section-title) {
        font-size: 32px;
        font-weight: 700;
        color: #1d2129;
        margin-bottom: 40px;
        text-align: center;
      }

      @include e(tech-logos) {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 24px;

        @include e(tech-logo) {
          padding: 12px 24px;
          background-color: #f5f7fa;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #4e5969;
          transition: all 0.3s ease;

          &:hover {
            background-color: #e4eaf5;
            color: #4096ff;
          }
        }
      }
    }

    @include e(footer) {
      padding: 40px;
      background-color: #1d2129;
      color: #ffffff;

      @include e(footer-content) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;

        @include e(social-links) {
          display: flex;
          gap: 24px;

          @include e(social-link) {
            color: #ffffff;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
              color: #4096ff;
            }
          }
        }
      }
    }
  }
</style>
