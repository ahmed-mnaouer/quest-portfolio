import { useEffect, useRef } from 'react'
import CvActions from './CvActions'
import ProjectLog from './ProjectLog'
import './PortfolioView.css'
import ProfileSections from './ProfileSections'
import SkillsLanguages from './SkillsLanguages'
import { PortfolioLinks } from './StickyPortfolioNav'
import AssetCredits from './AssetCredits'


interface Props { onPlay: () => void }

export default function PortfolioView({ onPlay }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }) }, [])

  return (
    <main className="portfolio-view">
      <nav
        id="portfolio-inline-nav"
        className="portfolio-nav"
        aria-label="Portfolio sections"
      >
        <PortfolioLinks />
      </nav>
      <section className="portfolio-intro" aria-labelledby="profile-name">
        <div>
          <p className="portfolio-label">ANALYTICS / AI / BUILDING</p>
          <h1 id="profile-name" ref={headingRef} tabIndex={-1}>Ahmed Mnaouer</h1>
          <p className="portfolio-role">Business questions. Data-driven exploration. Useful software.</p>
          <p className="portfolio-summary">I’m a Data Analytics for Business master’s student in Lisbon, connecting business context with analytical thinking and hands-on software projects.</p>
          <div className="portfolio-actions">
            <a className="portfolio-primary" href="#selected-projects">Explore my work ↓</a>
            <a href="https://www.linkedin.com/in/ahmedmnaouer/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/ahmed-mnaouer" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <CvActions />
          </div>
        </div>
        <aside className="character-panel" aria-label="Portfolio character">
          <p className="portfolio-label">AHMED / DATA MAGE</p>
          <div className="character-stage"><img className="portfolio-portrait" src={`${import.meta.env.BASE_URL}avatar/ahmed.png`} alt="Ahmed’s orange-hoodie RPG avatar holding a laptop" width="240" height="300" /></div>
          <button className="village-entry" type="button" onClick={onPlay}>Enter the village →</button>
          <p className="character-note">An optional playable version of my portfolio.</p>
        </aside>
      </section>
      <section id="selected-projects" className="portfolio-section" aria-labelledby="project-heading">
        <div className="portfolio-section-heading"><div><p className="portfolio-label">PROJECT LOG</p><h2 id="project-heading">Ideas turned into projects.</h2></div><a href="https://github.com/ahmed-mnaouer?tab=repositories" target="_blank" rel="noopener noreferrer">All repositories ↗</a></div>
        <p className="section-intro">
          Explore data pipelines, analytical models, and software applications.
          Open a case study for my contribution and limitations, or try the
          clearly labelled interactive prototype.
        </p>
        <ProjectLog />
      </section>
      <ProfileSections />
      <SkillsLanguages />
      <section id="about-ahmed" className="portfolio-panel" aria-labelledby="about-heading">
        <p className="portfolio-label">BEHIND THE CHARACTER</p><h2 id="about-heading">Business context meets technical curiosity.</h2>
        <div className="about-columns"><p>My background connects business analytics with hands-on software development. My project experience includes Angular, Python services, APIs, and MCP-based conversational AI integration.</p><p>I also enjoy RPGs and Nintendo games. This village brings that interest into my portfolio without asking visitors to play a game to see my work.</p></div>
      </section>
      <section id="contact-ahmed" className="portfolio-panel contact-panel" aria-labelledby="contact-heading">
        <div><p className="portfolio-label">NEXT CONVERSATION</p><h2 id="contact-heading">Let’s connect.</h2><p>Interested in my projects or background? You can reach me on LinkedIn.</p></div>
        <a className="contact-link" href="https://www.linkedin.com/in/ahmedmnaouer/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>
      </section>
      <AssetCredits />
      <footer className="portfolio-footer">Ahmed Mnaouer · Built with React, TypeScript, and an optional RPG village.</footer>
    </main>
  )
}
