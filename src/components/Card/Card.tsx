'use client';

import LazyImage from '../LazyImage/LazyImage.tsx';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';
import type { ReactNode, RefObject } from 'react';

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
  isActive?: boolean;

  onCardClick: () => void;

  cardRef?: RefObject<HTMLElement | null>;
  children?: ReactNode;
};

const Card = ({
  title,
  description,
  imageUrl,
  isActive = false,
  onCardClick,
  cardRef,
  children,
}: CardProps) => {
  const clickableProps = useClickableBlock({ onClick: onCardClick });

  return (
    <article
      ref={cardRef}
      className={`card ${isActive ? 'card--selected' : ''}`}
      {...clickableProps}
    >
      <div className="card-image-container">
        <LazyImage src={imageUrl} alt={description} />
      </div>

      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>

      <div className="card-actions">{children}</div>
    </article>
  );
};

export default Card;
