'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

import { clamp, clampOffset } from './treemap'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const DOUBLE_TAP_MS = 320
const DOUBLE_TAP_ZOOM = 2.2
const TAP_MOVE_THRESHOLD = 8

type ViewState = { scale: number; x: number; y: number }

type TouchState = {
  mode: 'idle' | 'tap' | 'pan' | 'pinch'
  moved: boolean
  startTs: number
  startClientX: number
  startClientY: number
  lastClientX: number
  lastClientY: number
  startDistance: number
  startScale: number
  pinchWorldX: number
  pinchWorldY: number
  lastTapTs: number
  lastTapX: number
  lastTapY: number
  tapTimer: ReturnType<typeof setTimeout> | null
}

const initialTouchState: TouchState = {
  mode: 'idle',
  moved: false,
  startTs: 0,
  startClientX: 0,
  startClientY: 0,
  lastClientX: 0,
  lastClientY: 0,
  startDistance: 1,
  startScale: 1,
  pinchWorldX: 0,
  pinchWorldY: 0,
  lastTapTs: 0,
  lastTapX: 0,
  lastTapY: 0,
  tapTimer: null
}

function midpointDistance(touches: TouchList) {
  if (touches.length < 2) {
    return 0
  }
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.hypot(dx, dy)
}

function midpoint(touches: TouchList) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2
  }
}

function screenToCanvas(clientX: number, clientY: number, bounds: DOMRect) {
  return {
    x: clientX - bounds.left,
    y: clientY - bounds.top
  }
}

function zoomAtPoint(
  canvasWidth: number,
  canvasHeight: number,
  current: ViewState,
  canvasX: number,
  canvasY: number,
  nextScale: number
): ViewState {
  const worldX = (canvasX - current.x) / current.scale
  const worldY = (canvasY - current.y) / current.scale
  const scale = clamp(nextScale, MIN_ZOOM, MAX_ZOOM)
  const rawX = canvasX - worldX * scale
  const rawY = canvasY - worldY * scale
  const offset = clampOffset(canvasWidth, canvasHeight, scale, rawX, rawY)
  return { scale, x: offset.x, y: offset.y }
}

export function useHeatmapGestures({
  targetRef,
  canvasRef,
  canvasSize,
  view,
  onViewChange,
  onTap
}: {
  targetRef: RefObject<HTMLElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  canvasSize: { width: number; height: number }
  view: ViewState
  onViewChange: (next: ViewState | ((current: ViewState) => ViewState)) => void
  onTap: (clientX: number, clientY: number) => void
}) {
  const touchStateRef = useRef<TouchState>({ ...initialTouchState })
  const viewRef = useRef(view)
  const canvasSizeRef = useRef(canvasSize)
  const onTapRef = useRef(onTap)
  const onViewChangeRef = useRef(onViewChange)

  viewRef.current = view
  canvasSizeRef.current = canvasSize
  onTapRef.current = onTap
  onViewChangeRef.current = onViewChange

  useEffect(() => {
    const target = targetRef.current
    const canvas = canvasRef.current
    if (!target || !canvas) {
      return
    }

    function beginPinch(touches: TouchList) {
      const state = touchStateRef.current
      const bounds = canvas!.getBoundingClientRect()
      const center = midpoint(touches)
      const point = screenToCanvas(center.x, center.y, bounds)
      const current = viewRef.current

      state.mode = 'pinch'
      state.moved = true
      state.startDistance = midpointDistance(touches) || 1
      state.startScale = current.scale
      state.pinchWorldX = (point.x - current.x) / current.scale
      state.pinchWorldY = (point.y - current.y) / current.scale
    }

    function applyPinch(touches: TouchList) {
      const state = touchStateRef.current
      const bounds = canvas!.getBoundingClientRect()
      const center = midpoint(touches)
      const point = screenToCanvas(center.x, center.y, bounds)
      const distance = midpointDistance(touches)
      if (!distance) {
        return
      }

      const { width, height } = canvasSizeRef.current
      const ratio = distance / state.startDistance
      const nextScale = clamp(state.startScale * ratio, MIN_ZOOM, MAX_ZOOM)
      const rawX = point.x - state.pinchWorldX * nextScale
      const rawY = point.y - state.pinchWorldY * nextScale
      const offset = clampOffset(width, height, nextScale, rawX, rawY)

      onViewChangeRef.current({ scale: nextScale, x: offset.x, y: offset.y })
    }

    function handleDoubleTap(clientX: number, clientY: number) {
      const bounds = canvas!.getBoundingClientRect()
      const point = screenToCanvas(clientX, clientY, bounds)
      const { width, height } = canvasSizeRef.current
      const current = viewRef.current

      if (current.scale > 1.05) {
        onViewChangeRef.current({ scale: 1, x: 0, y: 0 })
        return
      }

      onViewChangeRef.current(
        zoomAtPoint(width, height, current, point.x, point.y, DOUBLE_TAP_ZOOM)
      )
    }

    function onTouchStart(event: TouchEvent) {
      const state = touchStateRef.current

      if (event.touches.length >= 2) {
        event.preventDefault()
        beginPinch(event.touches)
        return
      }

      if (event.touches.length === 1) {
        const touch = event.touches[0]
        state.mode = 'tap'
        state.moved = false
        state.startTs = Date.now()
        state.startClientX = touch.clientX
        state.startClientY = touch.clientY
        state.lastClientX = touch.clientX
        state.lastClientY = touch.clientY
      }
    }

    function onTouchMove(event: TouchEvent) {
      const state = touchStateRef.current

      if (event.touches.length >= 2) {
        event.preventDefault()
        if (state.mode !== 'pinch') {
          beginPinch(event.touches)
        }
        applyPinch(event.touches)
        return
      }

      if (event.touches.length !== 1 || (state.mode !== 'tap' && state.mode !== 'pan')) {
        return
      }

      const touch = event.touches[0]
      const deltaFromStart = Math.hypot(
        touch.clientX - state.startClientX,
        touch.clientY - state.startClientY
      )

      if (state.mode === 'tap' && deltaFromStart > TAP_MOVE_THRESHOLD) {
        state.mode = 'pan'
        state.moved = true
      }

      if (state.mode !== 'pan') {
        return
      }

      event.preventDefault()
      const deltaX = touch.clientX - state.lastClientX
      const deltaY = touch.clientY - state.lastClientY
      state.lastClientX = touch.clientX
      state.lastClientY = touch.clientY

      const { width, height } = canvasSizeRef.current
      onViewChangeRef.current((current) => {
        if (current.scale <= 1) {
          return current
        }
        const nextOffset = clampOffset(
          width,
          height,
          current.scale,
          current.x + deltaX,
          current.y + deltaY
        )
        return { ...current, x: nextOffset.x, y: nextOffset.y }
      })
    }

    function onTouchEnd(event: TouchEvent) {
      const state = touchStateRef.current
      const now = Date.now()

      if (state.mode === 'tap' && !state.moved && now - state.startTs < 350) {
        const isDoubleTap =
          state.lastTapTs > 0 &&
          now - state.lastTapTs < DOUBLE_TAP_MS &&
          Math.hypot(state.startClientX - state.lastTapX, state.startClientY - state.lastTapY) < 28

        if (isDoubleTap) {
          if (state.tapTimer) {
            clearTimeout(state.tapTimer)
            state.tapTimer = null
          }
          handleDoubleTap(state.startClientX, state.startClientY)
          state.lastTapTs = 0
        } else {
          const tapX = state.startClientX
          const tapY = state.startClientY
          state.lastTapTs = now
          state.lastTapX = tapX
          state.lastTapY = tapY

          if (state.tapTimer) {
            clearTimeout(state.tapTimer)
          }
          state.tapTimer = setTimeout(() => {
            state.tapTimer = null
            onTapRef.current(tapX, tapY)
          }, DOUBLE_TAP_MS)
        }
      }

      if (event.touches.length === 1 && state.mode === 'pinch') {
        const touch = event.touches[0]
        state.mode = 'pan'
        state.moved = true
        state.startClientX = touch.clientX
        state.startClientY = touch.clientY
        state.lastClientX = touch.clientX
        state.lastClientY = touch.clientY
        return
      }

      if (event.touches.length === 0) {
        state.mode = 'idle'
        state.moved = false
      }
    }

    target.addEventListener('touchstart', onTouchStart, { passive: false })
    target.addEventListener('touchmove', onTouchMove, { passive: false })
    target.addEventListener('touchend', onTouchEnd, { passive: false })
    target.addEventListener('touchcancel', onTouchEnd, { passive: false })

    return () => {
      const state = touchStateRef.current
      if (state.tapTimer) {
        clearTimeout(state.tapTimer)
        state.tapTimer = null
      }
      target.removeEventListener('touchstart', onTouchStart)
      target.removeEventListener('touchmove', onTouchMove)
      target.removeEventListener('touchend', onTouchEnd)
      target.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [canvasRef, targetRef])

  return { minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM }
}
