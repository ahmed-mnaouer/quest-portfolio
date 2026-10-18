import { LANGUAGES, SKILL_GROUPS } from '../config/profile'
import './SkillsLanguages.css'

export default function SkillsLanguages() {
  return (
    <>
      <section
        id="skills"
        className="portfolio-section skills-section"
        aria-labelledby="skills-heading"
      >
        <p className="portfolio-label">TOOLKIT</p>
        <h2 id="skills-heading">Tools connected to actual work.</h2>

        <p className="section-intro">
          Used across coursework, internships, and personal projects.
          The project case studies explain how these tools were applied.
        </p>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <article key={group.id} className="skill-group">
              <h3>{group.title}</h3>
              <p>{group.description}</p>

              <ul
                className="skill-tools"
                aria-label={`${group.title} tools and methods`}
              >
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="languages"
        className="portfolio-section languages-section"
        aria-labelledby="languages-heading"
      >
        <p className="portfolio-label">LANGUAGES</p>
        <h2 id="languages-heading">Communication across contexts.</h2>

        <dl className="language-list">
          {LANGUAGES.map((language) => (
            <div key={language.name} className="language-item">
              <dt>{language.name}</dt>
              <dd>{language.level}</dd>
            </div>
          ))}
        </dl>

        <p className="language-note">
          English and French levels are self-assessed, not formal test
          results. My bachelor’s studies were taught in English.
        </p>
      </section>
    </>
  )
}