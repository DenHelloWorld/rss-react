import type { AICArtwork } from '../services/AICApiService.ts';
import { type JSX } from 'react';
import LazyImage from './LasyImage.tsx';

interface AICCardProps {
  art: AICArtwork;
  getImageUrl: (id: string) => string;
}

const AICCard = ({ art, getImageUrl }: AICCardProps): JSX.Element => {
  return (
    <article className="card">
      <div className="card-image-container">
        <LazyImage
          src={getImageUrl(art.image_id ?? '')}
          alt={art.thumbnail?.alt_text ?? art.artist_display}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{art.title}</h3>
        <p className="card-description">
          {(art.thumbnail?.alt_text ?? art.artist_display) ||
            'No description available'}
        </p>
      </div>
    </article>
  );
};

export default AICCard;
