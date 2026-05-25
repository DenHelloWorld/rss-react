import type { AICArtwork } from '../../services/AICApiService/aic-api-service.ts';
import { useEffect, useRef } from 'react';
import LazyImage from '../LazyImage/LazyImage.tsx';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ROUTES } from '../../consts/routes.const.ts';
import { useArtworkSelection } from '../../hooks/useArtworkSelection/useArtworkSelection.ts';
import Checkbox from '../Checkbox/Checkbox.tsx';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';

interface AICCardProps {
  art: AICArtwork;
  getImageUrl: (id: string) => string;
}

const AICCard = ({ art, getImageUrl }: AICCardProps) => {
  const { isSelected, toggle } = useArtworkSelection();
  const checked = isSelected(art.id);
  const cardRef = useRef<HTMLElement>(null);
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

  const handleCheckboxChange = () => {
    toggle(art);
  };

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [isActive]);

  return (
    <article
      ref={cardRef}
      className={`card ${isActive ? 'card--selected' : ''}`}
      {...useClickableBlock({
        onClick: handleDetails,
      })}
    >
      <div className="card-image-container">
        <LazyImage
          src={getImageUrl(art.image_id ?? '')}
          alt={art.thumbnail?.alt_text ?? art.artist_display}
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{art.title}</h2>
        <p className="card-description">
          {(art.thumbnail?.alt_text ?? art.artist_display) ||
            'No description available'}
        </p>
      </div>

      <div className="card-actions">
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
      </div>
    </article>
  );
};

export default AICCard;
