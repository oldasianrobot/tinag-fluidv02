import { useEffect, useRef, useState } from 'react'
import styles from './GenerativeCanvas.module.css'
import {
  sampleOffenseColor,
  sampleIncidentCount,
  incidentToSize,
  incidentToTrailLength,
} from '../data/fbiData'

const MAX_PARTICLES = 4000
const SPAWN_RATE = 5
const GLOBAL_TURBULENCE = 0.5
const MAX_DPR = 2

class Particle {
  constructor(x, y, vx, vy, color, size, maxTrailLength) {
    this.x = x
    this.y = y
    this.vx = vx + (Math.random() - 0.5) * 2
    this.vy = vy + (Math.random() - 0.5) * 2
    this.life = 1.0
    this.decay = 0.005 + Math.random() * 0.01
    this.color = color
    this.size = size
    this.maxTrailLength = maxTrailLength
    this.history = [{ x: this.x, y: this.y }]
  }

  update(globalTurbulence, mouseX, mouseY) {
    const dx = this.x - mouseX
    const dy = this.y - mouseY
    const angle = Math.atan2(dy, dx) + Math.PI * 0.5 + performance.now() * 0.0003
    this.vx += Math.cos(angle) * globalTurbulence
    this.vy += Math.sin(angle) * globalTurbulence
    this.vx *= 0.95
    this.vy *= 0.95
    this.x += this.vx
    this.y += this.vy
    this.life -= this.decay
    this.history.push({ x: this.x, y: this.y })
    if (this.history.length > this.maxTrailLength) this.history.shift()
  }

  draw(ctx) {
    if (this.history.length < 2) return
    ctx.beginPath()
    ctx.moveTo(this.history[0].x, this.history[0].y)
    for (let i = 1; i < this.history.length; i++) {
      const p0 = this.history[i - 1]
      const p1 = this.history[i]
      const cx = (p0.x + p1.x) / 2
      const cy = (p0.y + p1.y) / 2
      ctx.quadraticCurveTo(p0.x, p0.y, cx, cy)
    }
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.size
    ctx.globalAlpha = this.life
    ctx.lineCap = 'round'
    ctx.stroke()
  }
}

function makeDataParticle(x, y, vx, vy) {
  const count = sampleIncidentCount()
  const color = sampleOffenseColor()
  const size = incidentToSize(count)
  const trailLength = incidentToTrailLength(count)
  return new Particle(x, y, vx, vy, color, size, trailLength)
}


export function GenerativeCanvas() {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    particles: [],
    mouse: { x: -1000, y: -1000, vx: 0, vy: 0, active: false },
    lastMouse: { x: -1000, y: -1000 },
    width: 0,
    height: 0,
    rafId: null,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const s = stateRef.current

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      s.width = rect.width
      s.height = rect.height
      const dpr = Math.min(window.devicePixelRatio, MAX_DPR)
      canvas.width = s.width * dpr
      canvas.height = s.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, s.width, s.height)
    }

    resize()
    window.addEventListener('resize', resize)

    function animate() {
      ctx.globalAlpha = 0.08
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, s.width, s.height)
      ctx.globalAlpha = 1.0

      if (s.mouse.active && s.particles.length < MAX_PARTICLES) {
        for (let i = 0; i < SPAWN_RATE; i++) {
          s.particles.push(makeDataParticle(s.mouse.x, s.mouse.y, s.mouse.vx * 0.1, s.mouse.vy * 0.1))
        }
      }

      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i]
        p.update(GLOBAL_TURBULENCE, s.mouse.x, s.mouse.y)
        p.draw(ctx)
        if (p.life <= 0) s.particles.splice(i, 1)
      }

      s.rafId = requestAnimationFrame(animate)
    }

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, s.width, s.height)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (s.rafId) cancelAnimationFrame(s.rafId)
    }
  }, [])

  function handleMouseMove(e) {
    const s = stateRef.current
    const rect = canvasRef.current.getBoundingClientRect()
    s.lastMouse.x = s.mouse.x
    s.lastMouse.y = s.mouse.y
    s.mouse.x = e.clientX - rect.left
    s.mouse.y = e.clientY - rect.top
    s.mouse.vx = s.mouse.x - s.lastMouse.x
    s.mouse.vy = s.mouse.y - s.lastMouse.y
    s.mouse.active = true
  }

  function handleMouseLeave() {
    stateRef.current.mouse.active = false
  }

  function handleTouchMove(e) {
    e.preventDefault()
    const s = stateRef.current
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    s.lastMouse.x = s.mouse.x
    s.lastMouse.y = s.mouse.y
    s.mouse.x = touch.clientX - rect.left
    s.mouse.y = touch.clientY - rect.top
    s.mouse.vx = s.mouse.x - s.lastMouse.x
    s.mouse.vy = s.mouse.y - s.lastMouse.y
    s.mouse.active = true
  }

  function handleTouchEnd() {
    stateRef.current.mouse.active = false
  }

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className={styles.overlayUi}>
        <span className={styles.overlayTitle}>CANVAS SURFACE</span>
        <span className={styles.overlaySubtitle}>DRAG TO GENERATE</span>
      </div>
      <div className={styles.status}>
        <ParticleCount stateRef={stateRef} />
        <span className={styles.statusSub}>DECAY RATE: 0.005–0.015 / FRAME</span>
      </div>
    </div>
  )
}

function ParticleCount({ stateRef }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let rafId
    function tick() {
      setCount(prev => {
        const next = stateRef.current.particles.length
        return next !== prev ? next : prev
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <span className={styles.statusMain}>
      BUFFER:{' '}
      <span className={styles.mono}>{String(count).padStart(4, '0')}</span>
      {' '}PARTICLES
    </span>
  )
}
