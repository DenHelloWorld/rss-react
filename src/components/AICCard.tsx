import type { AICArtwork } from '../services/AICApiService.ts';
import React from 'react';

interface AICCardProps {
  art: AICArtwork;
  getImageUrl: (id: string) => string;
}

interface AICCardState {
  isImageLoadError: boolean;
  isImageLoaded: boolean;
}

class AICCard extends React.Component<AICCardProps, AICCardState> {
  constructor(props: AICCardProps) {
    super(props);
    this.state = { isImageLoadError: false, isImageLoaded: false };
  }

  render() {
    const { art, getImageUrl } = this.props;
    const { isImageLoadError, isImageLoaded } = this.state;

    const hasNoImage = !art.image_id || isImageLoadError;

    return (
      <article className="card">
        <div className="card-image-container">
          {hasNoImage && (
            <div className="card-placeholder-wrapper">
              <svg className="card-placeholder" role="presentation">
                <use href="/icons.svg#broken-image" />
              </svg>
            </div>
          )}

          {!isImageLoaded && !hasNoImage && <div className="skeleton"></div>}

          {art.image_id && !isImageLoadError && (
            <img
              src={getImageUrl(art.image_id)}
              alt={art.thumbnail?.alt_text || art.artist_display}
              className={`card-image ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => this.setState({ isImageLoaded: true })}
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
