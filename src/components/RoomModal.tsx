import { useEffect, useRef, type CSSProperties } from 'react'
import type { Room } from '../config/world'
import {
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  LEADERSHIP,
  SKILL_GROUPS,
} from '../config/profile'
import ProjectLog from './ProjectLog'
import CvActions from './CvActions'
import './RoomModal.css'

interface Props {
  room: Room
  onClose: () => void
}

function RoomContent({ roomId }: { roomId: string }) {
  if (roomId === 'war') {
    return (
      <>
        <p className="room-introduction">
          Browse the same projects available in the professional
          portfolio. No additional exploration is required to open
          a case study.
        </p>
        <ProjectLog />
      </>
    )
  }

  if (roomId === 'throne') {
    return (
      <>
        <p className="room-introduction">
          I’m Ahmed Mnaouer, a Data Analytics for Business master’s
          student in Lisbon. My work connects business questions,
          analytical methods, and software implementation.
        </p>

        <h3 className="room-section-title">Experience</h3>

        <div className="room-entry-list">
          {EXPERIENCE.map((entry) => (
            <article key={entry.id} className="room-entry">
              <p className="room-entry-meta">{entry.period}</p>
              <h4>{entry.role}</h4>
              <p className="room-entry-organisation">
                {entry.organisation}
              </p>
              <p>{entry.summary}</p>
            </article>
          ))}
        </div>

        <h3 className="room-section-title">Education</h3>

        <div className="room-entry-list">
          {EDUCATION.map((entry) => (
            <article key={entry.id} className="room-entry">
              <p className="room-entry-meta">{entry.period}</p>
              <h4>{entry.qualification}</h4>
              <p>{entry.institution}</p>
            </article>
          ))}
        </div>
      </>
    )
  }

  if (roomId === 'hall') {
    return (
      <>
        <p className="room-introduction">
          Experience gained through internships, collaborative work,
          and responsibilities beyond the classroom.
        </p>

        <h3 className="room-section-title">Internships</h3>

        <div className="room-entry-list">
          {EXPERIENCE.map((entry) => (
            <article key={entry.id} className="room-entry">
              <p className="room-entry-meta">{entry.period}</p>
              <h4>{entry.role}</h4>

              <p className="room-entry-organisation">
                {entry.organisation}
              </p>

              <p>{entry.summary}</p>

              <ul className="profile-bullets">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="room-section-title">Leadership</h3>

        <div className="room-entry-list">
          {LEADERSHIP.map((entry) => (
            <article key={entry.id} className="room-entry">
              <p className="room-entry-meta">{entry.period}</p>
              <h4>{entry.role}</h4>

              <p className="room-entry-organisation">
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
      </>
    )
  }

  if (roomId === 'armory') {
    return (
      <>
        <p className="room-introduction">
          A toolkit used across different projects. The case
          studies explain where each technology fits.
        </p>

        <div className="room-entry-list">
          {SKILL_GROUPS.map((group) => (
            <article key={group.id} className="room-entry">
              <h4>{group.title}</h4>
              <ul className="room-tool-list">
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </>
    )
  }

  if (roomId === 'tavern') {
    return (
      <>
        <p className="room-introduction">
          Away from analytical work, I enjoy RPGs and Nintendo
          games—including Suikoden, Zelda, and Fire Emblem.
          This village brings that interest into the portfolio.
        </p>

        <h3 className="room-section-title">Languages</h3>

        <dl className="room-language-list">
          {LANGUAGES.map((language) => (
            <div key={language.name}>
              <dt>{language.name}</dt>
              <dd>{language.level}</dd>
            </div>
          ))}
        </dl>

        <p className="room-small-note">
          English and French levels are self-assessed, not formal
          test results.
        </p>
      </>
    )
  }

  if (roomId === 'gate') {
    return (
      <>
        <p className="room-introduction">
          Interested in my work or background? Connect with me
          on LinkedIn or explore my repositories.
        </p>

        <div className="room-contact-actions">
          <a
            href="https://www.linkedin.com/in/ahmedmnaouer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://github.com/ahmed-mnaouer"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>

        <CvActions />
      </>
    )
  }

  return <p>This room is being prepared.</p>
}

export default function RoomModal({ room, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!dialog.open) dialog.showModal()

    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="room-dialog"
      role="dialog"
      aria-labelledby="room-dialog-title"
      aria-describedby="room-dialog-subtitle"
      style={{ '--room-accent': room.color } as CSSProperties}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return

        const bounds = event.currentTarget.getBoundingClientRect()

        const outside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom

        if (outside) onClose()
      }}
    >
      <header className="room-dialog-header">
        <div>
          <p className="room-dialog-kicker">AHMED’S QUEST</p>
          <h2 id="room-dialog-title">{room.name}</h2>
          <p id="room-dialog-subtitle">{room.subtitle}</p>
        </div>

        <button
          type="button"
          className="room-close"
          aria-label={`Close ${room.name}`}
          onClick={onClose}
          autoFocus
        >
          Close ×
        </button>
      </header>

      <div className="room-dialog-body">
        <RoomContent roomId={room.id} />
      </div>
    </dialog>
  )
}