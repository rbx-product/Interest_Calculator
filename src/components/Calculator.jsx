import { useState } from 'react'
import { FREQ, compute, validate, fmt } from '../lib/calc.js'
import Chart from './Chart.jsx'
const init = { mode: 'compound', cur: 'INR', P: '100000', rate: '8', duration: '10', unit: 'years', freq: 'monthly' }
const PRESETS = [['₹1,00,000 at 7% · 5 yrs', { P: '100000', rate: '7', duration: '5', unit: 'years' }], ['$10,000 at 5% · 10 yrs', { P: '10000', rate: '5', duration: '10', unit: 'years', cur: 'USD' }], ['€5,000 at 3% · 24 months', { P: '5000', rate: '3', duration: '24', unit: 'months', cur: 'EUR' }]]

export default function Calculator() {
  const [f, setF] = useState(init)
  const [errs, setErrs] = useState({})
  const [res, setRes] = useState(null)
  const [note, setNote] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const run = (form = f) => {
    const nums = { P: parseFloat(form.P), rate: parseFloat(form.rate), duration: parseFloat(form.duration) }
    const e = validate(nums)
    setErrs(e)
    if (Object.keys(e).length) return setRes(null)
    const base = { ...nums, unit: form.unit, n: FREQ[form.freq] }
    setRes({ form, main: compute({ ...base, mode: form.mode }), simple: compute({ ...base, mode: 'simple' }), comp: compute({ ...base, mode: 'compound' }), P: nums.P })
  }
  const text = () => `${res.form.mode === 'simple' ? 'Simple' : 'Compound'} interest on ${fmt(res.P, res.form.cur)} at ${res.form.rate}% for ${res.form.duration} ${res.form.unit}: interest ${fmt(res.main.interest, res.form.cur)}, total ${fmt(res.main.total, res.form.cur)} (Accrue)`
  const copy = async () => { try { await navigator.clipboard.writeText(text()); setNote('Copied to clipboard') } catch { setNote('Copy is not available in this browser') } }
  const share = async () => { if (navigator.share) { try { await navigator.share({ title: 'Accrue result', text: text() }) } catch {} } else copy() }
  const cur = res?.form.cur
  const field = (k, label) => (
    <div className={'field' + (errs[k] ? ' bad' : '')}>
      <label htmlFor={k}>{label}</label>
      <input id={k} inputMode="decimal" value={f[k]} onChange={set(k)} onKeyDown={(e) => e.key === 'Enter' && run()} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? k + '-e' : undefined} />
      {errs[k] && <p id={k + '-e'} className="err">{errs[k]}</p>}
    </div>
  )
  return (
    <section id="calculator" className="wrap calc" aria-labelledby="calc-h">
      <h2 id="calc-h">Interest calculator</h2>
      <div className="panel noprint">
        <div className="seg" role="tablist" aria-label="Interest type">
          {['simple', 'compound'].map((m) => <button key={m} role="tab" aria-selected={f.mode === m} onClick={() => setF({ ...f, mode: m })}>{m === 'simple' ? 'Simple interest' : 'Compound interest'}</button>)}
        </div>
        <div className="presets">{PRESETS.map(([l, p]) => <button key={l} className="chip" onClick={() => { const n = { ...f, ...p }; setF(n); run(n) }}>{l}</button>)}</div>
        <div className="grid2">
          <div className="field"><label htmlFor="cur">Currency</label><select id="cur" value={f.cur} onChange={set('cur')}>{['INR', 'USD', 'EUR', 'GBP'].map((c) => <option key={c}>{c}</option>)}</select></div>
          {field('P', 'Principal amount')}
          {field('rate', 'Annual interest rate (%)')}
          <div className="dur">{field('duration', 'Duration')}<div className="field"><label htmlFor="unit">Unit</label><select id="unit" value={f.unit} onChange={set('unit')}><option value="years">Years</option><option value="months">Months</option></select></div></div>
          {f.mode === 'compound' && <div className="field"><label htmlFor="freq">Compounding</label><select id="freq" value={f.freq} onChange={set('freq')}>{Object.keys(FREQ).map((k) => <option key={k} value={k}>{k[0].toUpperCase() + k.slice(1)}</option>)}</select></div>}
        </div>
        <div className="actions"><button className="btn" onClick={() => run()}>Calculate</button><button className="btn ghost" onClick={() => { setF(init); setErrs({}); setRes(null) }}>Reset</button></div>
      </div>
      {res && (
        <div className="results" aria-live="polite">
          <div className="hero-num"><span>Total amount</span><strong>{fmt(res.main.total, cur)}</strong><em>{res.main.growth.toFixed(2)}% growth over {+res.main.t.toFixed(2)} years</em></div>
          <div className="cards">
            <div className="card"><span>Principal</span><b>{fmt(res.P, cur)}</b></div>
            <div className="card"><span>Interest earned</span><b className="g">{fmt(res.main.interest, cur)}</b></div>
            <div className="card"><span>Interest share of total</span><b>{res.main.total ? ((res.main.interest / res.main.total) * 100).toFixed(1) : '0.0'}%</b></div>
          </div>
          <div className="bar" aria-hidden="true"><i style={{ width: `${res.main.total ? (res.P / res.main.total) * 100 : 100}%` }} /></div>
          <h3>Growth over time</h3>
          <Chart points={res.main.points} principal={res.P} cur={cur} />
          <h3>Simple vs compound</h3>
          <div className="cmp">
            {[['Simple', res.simple], ['Compound, ' + res.form.freq, res.comp]].map(([l, r]) => <div className="card" key={l}><span>{l}</span><b>{fmt(r.total, cur)}</b><small>Interest {fmt(r.interest, cur)}</small></div>)}
            <div className="card hl"><span>Compounding adds</span><b className="g">{fmt(res.comp.interest - res.simple.interest, cur)}</b><small>more interest than simple</small></div>
          </div>
          <h3>Year-by-year breakdown</h3>
          <div className="scroll"><table><caption className="sr">Year-by-year balance</caption><thead><tr><th scope="col">Year</th><th scope="col">Starting balance</th><th scope="col">Interest</th><th scope="col">Ending balance</th></tr></thead>
            <tbody>{res.main.rows.map((r) => <tr key={r.year}><th scope="row">{r.year}</th><td>{fmt(r.start, cur)}</td><td>{fmt(r.interest, cur)}</td><td>{fmt(r.end, cur)}</td></tr>)}</tbody></table></div>
          <div className="actions noprint"><button className="btn ghost" onClick={copy}>Copy result</button><button className="btn ghost" onClick={share}>Share</button><button className="btn ghost" onClick={() => window.print()}>Print</button><span role="status" className="note">{note}</span></div>
        </div>
      )}
    </section>
  )
}
