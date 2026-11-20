import { useState } from 'react'
import { fmt } from '../lib/calc.js'
const W = 640, H = 280, M = { l: 56, r: 16, t: 14, b: 30 }
export default function Chart({ points, principal, cur }) {
  const [hi, setHi] = useState(null)
  const tMax = points[points.length - 1].t || 1
  const yMax = Math.max(...points.map((p) => p.amount), principal, 1)
  const x = (t) => M.l + (t / tMax) * (W - M.l - M.r)
  const y = (v) => H - M.b - (v / yMax) * (H - M.t - M.b)
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.t)},${y(p.amount)}`).join(' ')
  const area = `${line} L${x(tMax)},${y(principal)} L${x(0)},${y(principal)} Z`
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax)
  const compact = (v) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(v)
  const at = (el, cx) => {
    const r = el.getBoundingClientRect()
    const t = ((((cx - r.left) / r.width) * W - M.l) / (W - M.l - M.r)) * tMax
    let best = 0
    points.forEach((p, i) => { if (Math.abs(p.t - t) < Math.abs(points[best].t - t)) best = i })
    setHi(best)
  }
  const h = hi != null ? points[hi] : null
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Growth from ${fmt(principal, cur)} to ${fmt(points[points.length - 1].amount, cur)}`} onMouseMove={(e) => at(e.currentTarget, e.clientX)} onMouseLeave={() => setHi(null)} onTouchMove={(e) => at(e.currentTarget, e.touches[0].clientX)}>
        {ticks.map((v) => <g key={v}><line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} className="grid" /><text x={M.l - 8} y={y(v) + 4} textAnchor="end" className="axis">{compact(v)}</text></g>)}
        <path d={area} className="interest-area" />
        <line x1={M.l} x2={W - M.r} y1={y(principal)} y2={y(principal)} className="principal-line" />
        <path d={line} className="total-line" />
        {[0, 0.5, 1].map((f) => <text key={f} x={x(f * tMax)} y={H - 8} textAnchor={f === 0 ? 'start' : f === 1 ? 'end' : 'middle'} className="axis">{+(f * tMax).toFixed(1)} yr</text>)}
        {h && <g><line x1={x(h.t)} x2={x(h.t)} y1={M.t} y2={H - M.b} className="cursor" /><circle cx={x(h.t)} cy={y(h.amount)} r="5" className="dot" /></g>}
      </svg>
      <div className="tip" role="status">{h ? <><b>Year {+h.t.toFixed(2)}</b> Total {fmt(h.amount, cur)} · Interest {fmt(h.amount - principal, cur)}</> : 'Hover or touch the chart for values'}</div>
      <figcaption><i className="sw navy" />Principal <i className="sw green" />Interest <i className="sw line" />Total amount</figcaption>
    </figure>
  )
}
