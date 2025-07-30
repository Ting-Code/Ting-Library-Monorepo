<template>
  <div :class="ns.b()">
    <div @click="handleLogin" :class="ns.e('button-box')">
      <sapn :class="ns.em('button-box', 'text')">{{ props.text }}</sapn>
      <span :class="ns.em('button-box', 'icon')">
        <el-icon><ArrowRightBold /></el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ArrowRightBold } from '@element-plus/icons-vue'
  import { useNamespace, loginSystem } from '@tingcode/system'

  interface ShinyTextProps {
    text?: string
  }

  const props = withDefaults(defineProps<ShinyTextProps>(), {
    text: ''
  })

  defineOptions({
    name: 'StartButton'
  })

  const handleLogin = () => {
    loginSystem()
  }
  const ns = useNamespace('start-button')
</script>

<style scoped lang="scss">
  @keyframes shine {
    0% {
      background-position: 100%;
    }
    100% {
      background-position: -100%;
    }
  }
  @keyframes glow-pulse {
    0% {
      filter: brightness(1) saturate(1);
    }

    100% {
      filter: brightness(1.1) saturate(1.2);
    }
  }
  @include b(start-button) {
    position: relative;
    background: linear-gradient(135deg, rgb(30, 160, 63), rgba(24, 47, 255, 0.6));
    background-size: 200% 200%;
    border-radius: 50px;
    border: none;
    padding: 18px 26px;
    color: white;
    cursor: pointer;
    isolation: isolate;
    box-shadow:
      0 0 40px rgba(58, 237, 112, 0.4),
      0 0 80px rgba(92, 246, 138, 0.3),
      0 8px 32px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: glow-pulse 3s ease-in-out infinite alternate;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.5px;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.6s ease;
      z-index: 1;
    }
    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      background-size: 200% 200%;
      border-radius: 50px;
      z-index: -1;
      animation: border-dance 4s linear infinite;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    &:hover {
      box-shadow:
        0 0 60px rgba(58, 237, 109, 0.2),
        0 0 120px rgba(92, 246, 138, 0.2),
        0 0 180px rgba(40, 217, 90, 0.2),
        0 12px 40px rgba(0, 0, 0, 0.4),
        inset 0 2px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 0 rgba(0, 0, 0, 0.3);
      transform: translateY(-4px) scale(1.01);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation-duration: 1.5s;
    }
    &:hover::before {
      left: 100%;
    }
    &:hover::after {
      opacity: 1;
    }
    &:active {
      transform: translateY(-2px) scale(1.02);
      transition: all 0.1s ease;
    }
    @include e(button-box) {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      font-weight: bold;
      background-image: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0) 60%
      );
      color: rgba(255, 255, 255, 0.64);
      background-clip: text;
      background-size: 200% 100%;
      -webkit-background-clip: text;
      animation-duration: 2s;
      animation: shine 2s linear infinite;

      @include m(text) {
        font-size: 20px;
        padding-right: 12px;
      }

      @include m(icon) {
        font-size: 12px;
        color: #313131;
        background: rgba(255, 255, 255, 0.8);
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
