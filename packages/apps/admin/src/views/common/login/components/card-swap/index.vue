<template>
  <div ref="containerRef" :class="ns.b()">
    <div :ref="(el) => el && cardRefs.push(el as HTMLElement)" :class="ns.e('card')">
      <div :class="ns.em('card', 'head')">
        <Header :url="`${url}system/home`" />
      </div>
      <div :class="ns.em('card', 'main')">
        <iframe :src="`${url}system/home`"></iframe>
      </div>
    </div>
    <div :ref="(el) => el && cardRefs.push(el as HTMLElement)" :class="ns.e('card')">
      <div :class="ns.em('card', 'head')">
        <Header :url="`${url}system/engineering`" />
      </div>
      <div :class="ns.em('card', 'main')">
        <iframe :src="`${url}system/engineering`"></iframe>
      </div>
    </div>
    <div :ref="(el) => el && cardRefs.push(el as HTMLElement)" :class="ns.e('card')">
      <div :class="ns.em('card', 'head')">
        <Header :url="`${url}system/markdown`" />
      </div>
      <div :class="ns.em('card', 'main')">
        <iframe :src="`${url}system/markdown`"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace, useMicro } from '@tingcode/system'
  import Header from './components/header/index.vue'
  import { ref, onMounted, onUnmounted, watch, nextTick, computed, useTemplateRef } from 'vue'
  import gsap from 'gsap'

  const { url } = useMicro('docs')

  const ns = useNamespace('card-swap')

  export interface CardSwapProps {
    cardDistance?: number
    verticalDistance?: number
    delay?: number
    pauseOnHover?: boolean
    onCardClick?: (idx: number) => void
    skewAmount?: number
    easing?: 'linear' | 'elastic'
  }
  const props = withDefaults(defineProps<CardSwapProps>(), {
    cardDistance: 60,
    verticalDistance: 70,
    delay: 2000,
    pauseOnHover: false,
    skewAmount: 6,
    easing: 'linear'
  })
  interface Slot {
    x: number
    y: number
    z: number
    zIndex: number
  }

  const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
  })

  const placeNow = (el: HTMLElement, slot: Slot, skew: number) => {
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true
    })
  }
  const containerRef = useTemplateRef<HTMLDivElement>('containerRef')
  const cardRefs = ref<HTMLElement[]>([])
  const order = ref<number[]>([0, 1, 2])
  const tlRef = ref<gsap.core.Timeline | null>(null)
  const intervalRef = ref<number>()

  const config = computed(() => {
    return props.easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        }
  })

  const initializeCards = () => {
    if (!cardRefs.value.length) return

    const total = cardRefs.value.length

    cardRefs.value.forEach((el, i) => {
      if (el) {
        placeNow(
          el,
          makeSlot(i, props.cardDistance, props.verticalDistance, total),
          props.skewAmount
        )
      }
    })
  }

  const updateCardPositions = () => {
    if (!cardRefs.value.length) return

    const total = cardRefs.value.length

    cardRefs.value.forEach((el, i) => {
      if (el) {
        const slot = makeSlot(i, props.cardDistance, props.verticalDistance, total)
        gsap.set(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          skewY: props.skewAmount
        })
      }
    })
  }

  const swap = () => {
    if (order.value.length < 2) return

    const [front, ...rest] = order.value
    const elFront = cardRefs.value[front]
    if (!elFront) return

    const tl = gsap.timeline()
    tlRef.value = tl

    tl.to(elFront, {
      y: '+=500',
      duration: config.value.durDrop,
      ease: config.value.ease
    })

    tl.addLabel('promote', `-=${config.value.durDrop * config.value.promoteOverlap}`)
    rest.forEach((idx, i) => {
      const el = cardRefs.value[idx]
      if (!el) return

      const slot = makeSlot(i, props.cardDistance, props.verticalDistance, cardRefs.value.length)
      tl.set(el, { zIndex: slot.zIndex }, 'promote')
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.value.durMove,
          ease: config.value.ease
        },
        `promote+=${i * 0.15}`
      )
    })

    const backSlot = makeSlot(
      cardRefs.value.length - 1,
      props.cardDistance,
      props.verticalDistance,
      cardRefs.value.length
    )
    tl.addLabel('return', `promote+=${config.value.durMove * config.value.returnDelay}`)
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex })
      },
      undefined,
      'return'
    )
    tl.set(elFront, { x: backSlot.x, z: backSlot.z }, 'return')
    tl.to(
      elFront,
      {
        y: backSlot.y,
        duration: config.value.durReturn,
        ease: config.value.ease
      },
      'return'
    )

    tl.call(() => {
      order.value = [...rest, front]
    })
  }

  const startAnimation = () => {
    stopAnimation()
    swap()
    intervalRef.value = window.setInterval(swap, props.delay)
  }

  const stopAnimation = () => {
    tlRef.value?.kill()
    if (intervalRef.value) {
      clearInterval(intervalRef.value)
    }
  }

  const resumeAnimation = () => {
    tlRef.value?.play()
    intervalRef.value = window.setInterval(swap, props.delay)
  }

  const setupHoverListeners = () => {
    if (props.pauseOnHover && containerRef.value) {
      containerRef.value.addEventListener('mouseenter', stopAnimation)
      containerRef.value.addEventListener('mouseleave', resumeAnimation)
    }
  }

  const removeHoverListeners = () => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('mouseenter', stopAnimation)
      containerRef.value.removeEventListener('mouseleave', resumeAnimation)
    }
  }

  watch(
    () => [props.cardDistance, props.verticalDistance, props.skewAmount],
    () => {
      updateCardPositions()
    }
  )

  watch(
    () => props.delay,
    () => {
      if (intervalRef.value) {
        clearInterval(intervalRef.value)
        intervalRef.value = window.setInterval(swap, props.delay)
      }
    }
  )

  watch(
    () => props.pauseOnHover,
    () => {
      removeHoverListeners()
      setupHoverListeners()
    }
  )

  watch(
    () => props.easing,
    () => {}
  )

  onMounted(() => {
    nextTick(() => {
      initializeCards()
      startAnimation()
      setupHoverListeners()
    })
  })

  onUnmounted(() => {
    stopAnimation()
    removeHoverListeners()
  })
</script>

<style lang="scss" scoped>
  @include b(card-swap) {
    position: absolute;

    @include e(card) {
      transform: scale(0.8);
      position: absolute;
      border-radius: 8px;
      background-color: getCssVar('bg-color', 'main');
      border: 1px solid getCssVar('text-color', 'primary');
      color: getCssVar('text-color', 'primary');

      @include m(head) {
        font-size: 32px;
        padding: 8px 16px;
        border-bottom: 1px solid getCssVar('text-color', 'primary');
      }

      @include m(main) {
        > iframe {
          width: calc(20vw + 600px);
          height: calc(10vh + 380px);
        }
      }
    }
  }
</style>
