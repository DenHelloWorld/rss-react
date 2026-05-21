import type { AICArtwork } from '../services/AICApiService.ts';
import { useEffect, useRef } from 'react';
import LazyImage from './LazyImage.tsx';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ROUTES } from '../consts/routes.const.ts';

interface AICCardProps {
  art: AICArtwork;
  getImageUrl: (id: string) => string;
}

const AICCard = ({ art, getImageUrl }: AICCardProps) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isActive = Number(id) === art.id;

  const handleDetails = () => {
    void navigate({
      pathname: `${ROUTES.DETAILS.path}/${String(art.id)}`,
      search: location.search,
    });
  };

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [isActive]);

  return (
    <button
      ref={cardRef}
      className={`card ${isActive ? 'card--selected' : ''}`}
      onClick={handleDetails}
    >
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
    </button>
  );
};

export default AICCard;
