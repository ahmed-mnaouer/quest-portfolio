import {
  EDUCATION,
  EXPERIENCE,
  HONOURS,
  LEADERSHIP,
} from '../config/profile'
import './ProfileSections.css'

export default function ProfileSections() {
  return (
    <div className="profile-sections">
      <section
        id="experience"
        className="portfolio-section profile-section"
        aria-labelledby="experience-heading"
      >
        <div className="portfolio-section-heading">
          <div>
            <p className="portfolio-label">EXPERIENCE LOG</p>
            <h2 id="experience-heading">Work beyond the classroom.</h2>
          </div>
        </div>

        <p className="section-intro">
          Internships connecting business context, analytical work,
          and software implementation.
        </p>

        <ol className="profile-timeline">
          {EXPERIENCE.map((entry) => (
            <li key={entry.id} className="experience-entry">
              <div className="experience-meta">
                <span className="profile-period">{entry.period}</span>
                <span>{entry.location}</span>
              </div>

              <div className="experience-content">
                <h3>{entry.role}</h3>
                <p className="profile-organisation">
                  {entry.organisation}
                </p>
                <p>{entry.summary}</p>

                <ul className="profile-bullets">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="education"
        className="portfolio-section profile-section"
        aria-labelledby="education-heading"
      >
        <p className="portfolio-label">LEARNING PATH</p>
        <h2 id="education-heading">
          Business foundations. Analytical depth.
        </h2>

        <div className="education-grid">
          {EDUCATION.map((entry) => (
            <article key={entry.id} className="profile-card">
              <p className="profile-period">{entry.period}</p>
              <h3>{entry.qualification}</h3>
              <p className="profile-organisation">
                {entry.institution}
              </p>

              <ul className="profile-bullets">
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="honours"
        className="portfolio-section profile-section"
        aria-labelledby="honours-heading"
      >
        <p className="portfolio-label">ACADEMIC MILESTONES</p>
        <h2 id="honours-heading">Recognition along the way.</h2>

        <ul className="honours-grid">
          {HONOURS.map((honour) => (
            <li key={honour.id} className="honour-card">
              <span className="honour-emblem" aria-hidden="true">
                ✦
              </span>
              <div>
                <h3>{honour.title}</h3>
                <p>{honour.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="leadership"
        className="portfolio-section profile-section"
        aria-labelledby="leadership-heading"
      >
        <p className="portfolio-label">BEYOND TECHNICAL WORK</p>
        <h2 id="leadership-heading">
          People, research, and responsibility.
        </h2>

        <div className="education-grid">
          {LEADERSHIP.map((entry) => (
            <article key={entry.id} className="profile-card">
              <p className="profile-period">{entry.period}</p>
              <h3>{entry.role}</h3>
              <p className="profile-organisation">
                {entry.organisation}
              </p>

              <ul className="profile-bullets">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}