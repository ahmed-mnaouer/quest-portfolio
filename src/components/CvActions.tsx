import { CV } from '../config/documents'
import './CvActions.css'

export default function CvActions() {
  if (!CV.ready) {
    return (
      <div className="cv-actions">
        <button
          type="button"
          className="cv-action"
          disabled
          title="The CV is not published yet"
        >
          View CV
        </button>

        <button
          type="button"
          className="cv-action"
          disabled
          title="The CV is not published yet"
        >
          Download CV
        </button>
      </div>
    )
  }

  return (
    <div className="cv-actions">
      <a
        className="cv-action"
        href={CV.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View CV ↗
      </a>

      <a
        className="cv-action"
        href={CV.url}
        download={CV.downloadName}
      >
        Download CV ↓
      </a>
    </div>
  )
}