import { useState } from 'react'
export const FAQ = [
  ['What is simple interest?', 'Simple interest is charged or earned only on the original principal. The interest amount is the same every period.'],
  ['What is compound interest?', 'Compound interest is calculated on the principal plus interest already added, so interest earns interest.'],
  ['How do I calculate simple interest?', 'Multiply principal by the annual rate (as a percentage) and the time in years, then divide by 100: SI = P × R × T / 100.'],
  ['How do I calculate compound interest?', 'Use A = P × (1 + R/n)^(n×t), where R is the annual rate as a decimal, n is compounding periods per year and t is years. Compound interest is A − P.'],
  ['What is monthly compounding?', 'Interest is added to the balance 12 times a year, each time at one-twelfth of the annual rate.'],
  ['Which is better, simple or compound interest?', 'When you earn interest, compound is higher for the same rate and time. When you borrow, simple interest costs less. The only exception is a single period, where they are equal.'],
  ['Does compound interest increase when compounding is monthly?', 'Yes, slightly. More frequent compounding gives a higher total, but the gain shrinks as frequency rises (daily is only a little more than monthly).'],
  ['How can I calculate interest for a period of months?', 'Convert months to years by dividing by 12, then use the usual formula. For example, 18 months is 1.5 years. The calculator can do this when you select months.'],
  ['What is the difference between interest and total amount?', 'Interest is only the extra money earned or owed. The total amount is principal plus interest.'],
]
export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="wrap" aria-labelledby="faq-h"><h2 id="faq-h">Frequently asked questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }) }} />
      <div className="faq">{FAQ.map(([q, a], i) => (
        <div key={q} className="qa"><h3><button aria-expanded={open === i} aria-controls={'a' + i} id={'q' + i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span aria-hidden="true">{open === i ? '−' : '+'}</span></button></h3>
          <div id={'a' + i} role="region" aria-labelledby={'q' + i} hidden={open !== i}><p>{a}</p></div></div>))}</div>
    </section>
  )
}
export function Learn() {
  return (
    <section id="learn" className="wrap prose" aria-labelledby="learn-h">
      <h2 id="learn-h">How interest works</h2>
      <h3>What is simple interest?</h3><p>Simple interest grows in a straight line. You earn (or pay) interest only on the original amount, so ₹10,000 at 5% earns ₹500 every year.</p>
      <h3>What is compound interest?</h3><p>With compound interest, each period’s interest is added to the balance and earns interest itself. Growth curves upward, and the longer the period, the bigger the gap from simple interest.</p>
      <h3>How is simple interest calculated?</h3><p><code>SI = (P × R × T) / 100</code> and <code>Total = P + SI</code>. Example: P = 10,000, R = 5%, T = 3 years gives SI = 1,500 and a total of 11,500.</p>
      <h3>How is compound interest calculated?</h3><p><code>A = P × (1 + R/n)^(n×t)</code>. Example: 10,000 at 5% compounded yearly for 3 years is 10,000 × 1.05³ = 11,576.25, so the interest is 1,576.25. Monthly durations are divided by 12 first.</p>
      <h3>Simple vs compound interest</h3><p>For the same principal, rate and time, compound interest is never lower than simple interest. The difference is small over a short time and large over decades.</p>
      <h3>How compounding frequency affects interest</h3><p>Compounding more often adds interest sooner. On 10,000 at 8% for 10 years, yearly compounding gives about 21,589, monthly about 22,196 and daily about 22,253. The gains flatten as frequency increases.</p>
      <p className="small">Calculations are for illustration. Real products may use different day-count rules, fees or taxes.</p>
    </section>
  )
}
