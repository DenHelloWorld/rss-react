import type { AICArtwork } from '../services/AICApiService.ts';
import React from 'react';

interface AICCardProps {
  art: AICArtwork;
  getImageUrl: (id: string | null) => string;
}

interface AICCardState {
  isImageLoadError: boolean;
}

class AICCard extends React.Component<AICCardProps, AICCardState> {
  constructor(props: AICCardProps) {
    super(props);
    this.state = { isImageLoadError: false };
  }

  render() {
    const { art, getImageUrl } = this.props;
    const { isImageLoadError } = this.state;

    return (
      <article className="card">
        <div className="card-image-container">
          {isImageLoadError || !art.image_id ? (
            <svg className="card-placeholder" role="presentation">
              <use href="/icons.svg#broken-image" />
            </svg>
          ) : (
            <img
              src={getImageUrl(art.image_id)}
              alt={art.thumbnail?.alt_text || art.artist_display}
              className="card-image"
              onError={() => this.setState({ isImageLoadError: true })}
            />
          )}
        </div>
        <div className="card-content">
          <h3 className="card-title">{art.title}</h3>
          <p className="card-description">
            {art.thumbnail?.alt_text ||
              art.artist_display ||
              'No description available'}
          </p>
        </div>
      </article>
    );
  }
}

export default AICCard;
