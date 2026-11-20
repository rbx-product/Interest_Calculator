import { SITE } from '../config.js'
const D = <p className="small">General informational draft, not legal advice. Review and edit it for your situation before relying on it. Last updated: {SITE.updated}.</p>
export const PAGES = {
  about: ['About', <><p>{SITE.name} is a free set of tools for understanding how money grows. You enter a principal, a rate and a duration, and the calculator shows total amount, interest, a growth chart and a year-by-year table.</p><p>Everything runs in your browser. There is no account, and your inputs are not sent to a server.</p></>],
  contact: ['Contact', SITE.contactEmail ? <p>Questions, corrections or feedback: <a href={'mailto:' + SITE.contactEmail}>{SITE.contactEmail}</a></p> : <p>Contact details have not been set up yet. The site owner can add an email address in <code>src/config.js</code>.</p>],
  privacy: ['Privacy Policy', <><p>The calculator runs entirely in your browser; values you enter are not collected or stored by this site.</p><p>Hosting providers may keep standard server logs (such as IP address and pages requested). If advertising or analytics are added later, this policy should be updated to describe cookies and the services used, including how to opt out.</p>{D}</>],
  terms: ['Terms and Conditions', <><p>By using this site you agree to use it for lawful purposes. The calculators are provided as is, without warranties of any kind, and the owner is not liable for losses arising from their use.</p><p>Site content and code are provided by the owner; do not copy it in a way that misrepresents its source.</p>{D}</>],
  disclaimer: ['Disclaimer', <><p>Results are estimates based on the standard simple and compound interest formulas. They are not financial, investment, tax or legal advice.</p><p>Actual returns or loan costs depend on the product, fees, taxes, day-count conventions and rounding. Confirm figures with your provider or a qualified adviser.</p>{D}</>],
}
export default function Page({ id }) {
  const [t, body] = PAGES[id]
  return <main className="wrap prose page" id="main"><h1>{t}</h1>{body}<p><a href="#/">← Back to calculator</a></p></main>
}
