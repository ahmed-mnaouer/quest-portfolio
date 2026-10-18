import { useState } from 'react'
import { PROJECTS } from '../config/projects'
import WishDemo from './WishDemo'
import './ProjectLog.css'

export default function ProjectLog() {
  const [filter, setFilter] = useState('All')
  const [wishOpen, setWishOpen] = useState(false)

  const filters = [
    'All',
    ...new Set(PROJECTS.map((project) => project.category)),
  ]

  const shown = PROJECTS.filter(
    (project) => filter === 'All' || project.category === filter,
  )

  return (
    <div className="project-log">
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="project-count" role="status">
        {shown.length} {shown.length === 1 ? 'project' : 'projects'}
      </p>

      <div className="project-grid">
        {shown.map((project) => (
          <article
            key={project.id}
            className={`project-card${
              project.featured ? ' is-featured' : ''
            }`}
          >
            <div
              className="project-preview"
              aria-label="Conceptual workflow, not a screenshot"
            >
              <span className="preview-caption">
                {project.category} / workflow sketch
              </span>

              <ol className="project-pipeline">
                {project.pipeline.map((step, index) => (
                  <li key={step}>
                    <span className="pipeline-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="project-card-body">
              <p className="project-eyebrow">{project.label}</p>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary}</p>

              <ul className="project-tags" aria-label="Technologies">
                {project.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>

              <details className="project-details">
                <summary>
                  Read case study
                  <span aria-hidden="true">+</span>
                </summary>

                <div className="project-case">
                  <h4>My contribution</h4>
                  <p>{project.contribution}</p>

                  <h4>Approach</h4>
                  <ol>
                    {project.approach.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>

                  <h4>Evidence & status</h4>
                  <p>{project.evidence}</p>

                  <h4>Limitations</h4>
                  <p>{project.limitations}</p>
                </div>
              </details>

              <div className="project-actions">
                {project.demo === 'wish' && (
                  <button
                    type="button"
                    className="project-demo-toggle"
                    aria-expanded={wishOpen}
                    aria-controls="wish-project-demo"
                    onClick={() => setWishOpen((value) => !value)}
                  >
                    {wishOpen
                      ? 'Close interactive prototype'
                      : 'Try interactive prototype'}
                  </button>
                )}

                {project.sourceUrl && (
                  <a
                    className="project-source"
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.sourceLabel ?? 'Project link'} ↗
                  </a>
                )}
              </div>
            </div>

            {project.demo === 'wish' && (
              <div
                id="wish-project-demo"
                className="project-demo-slot"
                hidden={!wishOpen}
              >
                {wishOpen && <WishDemo />}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}