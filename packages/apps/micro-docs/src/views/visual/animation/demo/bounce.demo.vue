<template>
  <div :class="ns.b()">
    <ReButton @click="startAnimation">开始弹跳动画</ReButton>
    <ReButton @click="endAnimation">结束弹跳动画</ReButton>
    <div :class="ns.e('animated-element')"></div>
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap'
  import { ReButton } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'

  const ns = useNamespace('bounce-animation')

  const startAnimation = () => {
    gsap.to(`.${ns.e('animated-element')}`, {
      duration: 1,
      x: -30, // 修改为 x 轴位移
      repeat: 2,
      yoyo: true,
      ease: 'bounce.out'
    })
  }

  const endAnimation = () => {
    gsap.to(`.${ns.e('animated-element')}`, {
      duration: 0.5,
      x: 0,
      ease: 'power2.out'
    })
  }
</script>

<style lang="scss" scoped>
  @include b(bounce-animation) {
    @include e(animated-element) {
      margin-top: 18px;
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, #ff0000, #00ff00);
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
</style>
