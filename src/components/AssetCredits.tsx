import './AssetCredits.css'

export default function AssetCredits() {
  return (
    <details className="asset-credits">
      <summary>Credits & artwork</summary>

      <div className="asset-credits-content">
        <p>
          Village layout and portfolio implementation by Ahmed Mnaouer,
          with AI-assisted development. Third-party artwork is credited
          separately below.
        </p>

        <ul>
          <li>
            <strong>Village artwork:</strong>{' '}
            <a
              href="https://limezu.itch.io/serenevillagerevamped"
              target="_blank"
              rel="noopener noreferrer"
            >
              Serene Village — revamped by LimeZu
            </a>
            . Licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY 4.0
            </a>
            . Tile placement and layer organisation adapted for this
            portfolio’s custom map.
          </li>

          <li>
            <strong>Village character artwork:</strong>{' '}
            <a
              href="https://limezu.itch.io/moderninteriors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Modern Interiors by LimeZu
            </a>
            . Character assembled from the purchased pack under its
            complete-version license. The artwork is not offered here
            as an asset download.
          </li>

          <li>
            <strong>Character assembly tool:</strong>{' '}
            <a
              href="https://legendaryswordsman2.itch.io/character-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              Character Generator 2.0 by MrSwordsman
            </a>
            .
          </li>

          <li>
            <strong>Large character portrait:</strong>{' '}
            AI-generated concept artwork used separately from the
            village sprite.
          </li>

          <li>
            <strong>Typography:</strong>{' '}
            Press Start 2P and Pixelify Sans, obtained through Google
            Fonts.
          </li>
        </ul>

        <p className="asset-credits-note">
          Artwork retains its respective licensing terms. Its use does
          not imply endorsement of this portfolio by the creators.
        </p>
      </div>
    </details>
  )
}