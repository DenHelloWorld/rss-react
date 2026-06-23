'use client';

import {
  type AICArtwork,
  getArtworkImageUrl,
} from '../../store/arts/arts-api.ts';
import { useAICCard } from '../../hooks/useAICCard/useAICCard.ts';
import Card from '../Card/Card.tsx';
import Checkbox from '../Checkbox/Checkbox.tsx';

type AICCardProps = {
  art: AICArtwork;
};

const AICCard = ({ art }: AICCardProps) => {
  const { cardRef, isActive, checked, handleDetails, handleCheckboxChange } =
    useAICCard(art);

  const description =
    (art.thumbnail?.alt_text ?? art.artist_display) ||
    'No description available';
  const imageUrl = getArtworkImageUrl(art.image_id ?? '');

  return (
    <Card
      cardRef={cardRef}
      title={art.title}
      description={description}
      imageUrl={imageUrl}
      isActive={isActive}
      onCardClick={handleDetails}
    >
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
    </Card>
  );
};

export default AICCard;
