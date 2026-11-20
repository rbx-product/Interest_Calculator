import assert from 'node:assert'
import { compute, validate } from './calc.js'
const c = (o) => compute({ P: 10000, rate: 5, duration: 3, unit: 'years', n: 1, mode: 'simple', ...o })
const near = (a, b) => assert(Math.abs(a - b) < 0.01, `${a} != ${b}`)
near(c({}).interest, 1500)
near(c({ mode: 'compound' }).total, 11576.25)
near(c({ mode: 'compound', n: 12, duration: 12, unit: 'months' }).total, 10511.62)
near(c({ mode: 'compound', n: 4, rate: 8, duration: 2.5 }).total, 10000 * Math.pow(1.02, 10))
near(c({ rate: 0 }).interest, 0)
near(c({ P: 0, mode: 'compound' }).total, 0)
assert.equal(c({ duration: 30, unit: 'months' }).rows.length, 3)
assert(validate({ P: -1, rate: 5, duration: 1 }).P && validate({ P: 1, rate: 'x', duration: 0 }).rate)
console.log('all calculation tests passed')
