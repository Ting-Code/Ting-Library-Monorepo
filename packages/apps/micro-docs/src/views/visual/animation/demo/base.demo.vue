<template>
  <div :class="ns.b()">
    <ReButton @click="startAnimation">开始动画</ReButton>
    <ReButton @click="endAnimation">恢复动画</ReButton>
    <div :class="ns.e('animated-element')"></div>
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import { ReButton } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'

  const ns = useNamespace('base-animation')

  const startAnimation = () => {
    gsap.to(`.${ns.e('animated-element')}`, {
      duration: 1.5,
      x: 200,
      rotation: 720,
      opacity: 0.8,
      scale: 0.5,
      ease: 'elastic.out(1, 0.3)',
      boxShadow: '0 0 20px 10px rgba(0, 255, 255, 0.8)',
      backgroundColor: 'linear-gradient(45deg, #6a0dad, #ff69b4)',
      borderRadius: '50%'
    })
  }

  const endAnimation = () => {
    gsap.to(`.${ns.e('animated-element')}`, {
      duration: 1,
      x: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'linear-gradient(45deg, #6a0dad, #ff69b4)',
      borderRadius: '10px',
      skewX: 0,
      skewY: 0,
      ease: 'power2.out',
      width: '100px',
      height: '100px'
    })
  }
</script>

<style lang="scss" scoped>
  @include b(base-animation) {
    @include e(animated-element) {
      margin-top: 18px;
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, #6a0dad, #ff69b4);
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
</style>
