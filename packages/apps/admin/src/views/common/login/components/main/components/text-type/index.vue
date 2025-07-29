<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch, computed, useTemplateRef } from 'vue'
  import { gsap } from 'gsap'

  interface TextTypeProps {
    className?: string
    showCursor?: boolean
    hideCursorWhileTyping?: boolean
    cursorCharacter?: string
    cursorBlinkDuration?: number
    cursorClassName?: string
    text: string | string[]
    as?: string
    typingSpeed?: number
    initialDelay?: number
    pauseDuration?: number
    deletingSpeed?: number
    loop?: boolean
    textColors?: string[]
    variableSpeed?: { min: number; max: number }
    onSentenceComplete?: (sentence: string, index: number) => void
    startOnVisible?: boolean
    reverseMode?: boolean
  }

  const props = withDefaults(defineProps<TextTypeProps>(), {
    as: 'div',
    typingSpeed: 50,
    initialDelay: 0,
    pauseDuration: 2000,
    deletingSpeed: 30,
    loop: true,
    className: '',
    showCursor: true,
    hideCursorWhileTyping: false,
    cursorCharacter: '|',
    cursorBlinkDuration: 0.5,
    textColors: () => [],
    startOnVisible: false,
    reverseMode: false
  })

  const displayedText = ref('')
  const currentCharIndex = ref(0)
  const isDeleting = ref(false)
  const currentTextIndex = ref(0)
  const isVisible = ref(!props.startOnVisible)
  const cursorRef = useTemplateRef('cursorRef')
  const containerRef = useTemplateRef('containerRef')

  const textArray = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))

  const getRandomSpeed = () => {
    if (!props.variableSpeed) return props.typingSpeed
    const { min, max } = props.variableSpeed
    return Math.random() * (max - min) + min
  }

  let timeout: ReturnType<typeof setTimeout> | null = null

  const clearTimeoutIfNeeded = () => {
    if (timeout) clearTimeout(timeout)
  }

  const executeTypingAnimation = () => {
    const currentText = textArray.value[currentTextIndex.value]
    const processedText = props.reverseMode ? currentText.split('').reverse().join('') : currentText

    if (isDeleting.value) {
      if (displayedText.value === '') {
        isDeleting.value = false
        if (currentTextIndex.value === textArray.value.length - 1 && !props.loop) return

        props.onSentenceComplete?.(textArray.value[currentTextIndex.value], currentTextIndex.value)

        currentTextIndex.value = (currentTextIndex.value + 1) % textArray.value.length
        currentCharIndex.value = 0
        timeout = setTimeout(() => {}, props.pauseDuration)
      } else {
        timeout = setTimeout(() => {
          displayedText.value = displayedText.value.slice(0, -1)
        }, props.deletingSpeed)
      }
    } else {
      if (currentCharIndex.value < processedText.length) {
        timeout = setTimeout(
          () => {
            displayedText.value += processedText[currentCharIndex.value]
            currentCharIndex.value += 1
          },
          props.variableSpeed ? getRandomSpeed() : props.typingSpeed
        )
      } else if (textArray.value.length > 1) {
        timeout = setTimeout(() => {
          isDeleting.value = true
        }, props.pauseDuration)
      }
    }
  }

  watch(
    [displayedText, currentCharIndex, isDeleting, isVisible],
    () => {
      if (!isVisible.value) return
      clearTimeoutIfNeeded()

      if (currentCharIndex.value === 0 && !isDeleting.value && displayedText.value === '') {
        timeout = setTimeout(() => {
          executeTypingAnimation()
        }, props.initialDelay)
      } else {
        executeTypingAnimation()
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    if (props.showCursor && cursorRef.value) {
      gsap.set(cursorRef.value, { opacity: 1 })
      gsap.to(cursorRef.value, {
        opacity: 0,
        duration: props.cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }

    if (props.startOnVisible && containerRef.value) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) isVisible.value = true
          })
        },
        { threshold: 0.1 }
      )
      if (containerRef.value instanceof Element) {
        observer.observe(containerRef.value)
      }
      onBeforeUnmount(() => observer.disconnect())
    }
  })

  onBeforeUnmount(() => {
    clearTimeoutIfNeeded()
  })
</script>

<template>
  <component
    :is="as"
    ref="containerRef"
    :class="`inline-block whitespace-pre-wrap tracking-tight ${className}`"
    v-bind="$attrs"
  >
    <span class="inline">
      {{ displayedText }}
    </span>
    <span
      v-if="showCursor"
      ref="cursorRef"
      :class="`ml-1 inline-block opacity-100 ${
        hideCursorWhileTyping &&
        (currentCharIndex < textArray[currentTextIndex].length || isDeleting)
          ? 'hidden'
          : ''
      } ${cursorClassName}`"
    >
      {{ cursorCharacter }}
    </span>
  </component>
</template>
