<template>
  <div :class="ns.b()">
    <ReButton @click="startAnimation">开始淡入动画</ReButton>
    <ReButton @click="endAnimation">结束淡入动画</ReButton>
    <div :class="ns.e('animated-element')"></div>
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import { ReButton } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'

  const ns = useNamespace('fade-animation')

  const startAnimation = () => {
    gsap.to(`.${ns.e('animated-element')}`, {
      duration: 1.5,
      opacity: 0.2,
      ease: 'power2.out'
    })
  }

  const endAnimation = () => {
    gsap.to(`.${ns.e('animated-element')}`, {
      duration: 1,
      opacity: 1,
      ease: 'power2.out'
    })
  }
</script>

<style lang="scss" scoped>
  @include b(fade-animation) {
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
