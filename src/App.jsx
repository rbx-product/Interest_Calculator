import { useEffect, useState } from 'react'
import Calculator from './components/Calculator.jsx'
import Page, { PAGES } from './components/Pages.jsx'
import { Faq, Learn } from './components/Content.jsx'
import { SITE } from './config.js'
const Logo = () => <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#0b1f3a" /><path d="M7 23 L14 15 L18 19 L25 8" fill="none" stroke="#2fd3a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
const route = () => location.hash.replace(/^#\/?/, '')
export default function App() {
  const [r, setR] = useState(route())
  useEffect(() => { const h = () => { setR(route()); if (PAGES[route()] || !route()) window.scrollTo(0, 0) }; addEventListener('hashchange', h); return () => removeEventListener('hashchange', h) }, [])
  const isPage = PAGES[r]
  const jump = (id) => (e) => { e.preventDefault(); if (location.hash) history.pushState(null, '', location.pathname); setR(''); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 30) }
  useEffect(() => { document.title = isPage ? `${PAGES[r][0]} – ${SITE.name}` : 'Accrue – Simple & Compound Interest Calculator with Growth Charts' }, [r])
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <header className="top noprint"><div className="wrap bar2"><a className="brand" href="#/"><Logo />{SITE.name}</a>
      <nav aria-label="Primary"><a href="#calculator" onClick={jump('calculator')}>Calculator</a><a href="#learn" onClick={jump('learn')}>Learn</a><a href="#faq" onClick={jump('faq')}>FAQ</a><a href="#/about">About</a></nav></div></header>
    {isPage ? <Page id={r} /> : <main id="main">
      <section className="wrap hero"><div><h1>Understand how your money grows.</h1><p>Calculate interest, explore growth over time, and compare simple and compound interest with free interactive tools.</p><a className="btn" href="#calculator" onClick={jump('calculator')}>Open the calculator</a></div>
        <svg viewBox="0 0 300 160" className="art" role="img" aria-label="Illustration: compound growth curve above a straight simple-interest line"><path d="M10 140 L290 100" className="a1" /><path d="M10 140 C120 135 200 110 290 20" className="a2" /><circle cx="290" cy="20" r="5" className="a3" /><circle cx="290" cy="100" r="5" className="a4" /></svg></section>
      <Calculator /><div className="adslot" aria-hidden="true" /><Learn /><Faq />
    </main>}
    <footer className="foot noprint"><div className="wrap"><p>© {new Date().getFullYear()} {SITE.name}. For illustration only, not financial advice.</p><nav aria-label="Legal">{['about', 'contact', 'privacy', 'terms', 'disclaimer'].map((k) => <a key={k} href={'#/' + k}>{PAGES[k][0]}</a>)}</nav></div></footer>
  </>)
}
