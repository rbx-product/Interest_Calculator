export const FREQ = { annually: 1, 'semi-annually': 2, quarterly: 4, monthly: 12, daily: 365 }
export const toYears = (d, unit) => (unit === 'months' ? d / 12 : d)
export const round2 = (x) => Math.round((x + Number.EPSILON) * 100) / 100

export function amountAt(mode, P, rate, t, n = 1) {
  const r = rate / 100
  return mode === 'simple' ? P + P * r * t : P * Math.pow(1 + r / n, n * t)
}

export function compute({ mode, P, rate, duration, unit, n }) {
  const t = toYears(duration, unit)
  const total = amountAt(mode, P, rate, t, n)
  const interest = total - P
  const points = [{ t: 0, amount: P }]
  const rows = []
  let prev = P
  for (let y = 1; y <= Math.ceil(t); y++) {
    const tt = Math.min(y, t)
    const end = amountAt(mode, P, rate, tt, n)
    rows.push({ year: y, start: prev, interest: end - prev, end })
    points.push({ t: tt, amount: end })
    prev = end
  }
  return { t, total, interest, growth: P > 0 ? (interest / P) * 100 : 0, points, rows }
}

export function validate({ P, rate, duration }) {
  const e = {}
  if (!(P >= 0) || P > 1e12) e.P = 'Enter a principal between 0 and 1,000,000,000,000.'
  if (!(rate >= 0) || rate > 100) e.rate = 'Enter a rate between 0 and 100.'
  if (!(duration > 0) || duration > 100 * 12) e.duration = 'Enter a duration greater than 0 (max 100 years).'
  return e
}

export const fmt = (v, cur) =>
  new Intl.NumberFormat(cur === 'INR' ? 'en-IN' : 'en-US', { style: 'currency', currency: cur, maximumFractionDigits: 2 }).format(round2(v))
