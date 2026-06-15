import { type ChangeEvent, useEffect, useRef } from 'react';
import type React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '../../consts/routes.const';
import { useArtworkSelection } from '../useArtworkSelection/useArtworkSelection';
import type { AICArtwork } from '../../store/arts/arts-api';

type UseAICCardReturn = {
  cardRef: React.RefObject<HTMLElement | null>;
  isActive: boolean;
  checked: boolean;
  handleDetails: () => void;
  handleCheckboxChange: (e?: ChangeEvent | MouseEvent) => void;
};

export const useAICCard = (art: AICArtwork): UseAICCardReturn => {
  const { isSelected, toggle } = useArtworkSelection();
  const checked = isSelected(art.id);
  const cardRef = useRef<HTMLElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ id?: string }>();
  const isActive = Number(params.id) === art.id;

  const handleDetails = () => {
    router.push(
      `/${ROUTES.DETAILS.path}/${String(art.id)}?${searchParams.toString()}`
    );
  };

  const handleCheckboxChange = (e?: ChangeEvent | MouseEvent) => {
    e?.stopPropagation();
    toggle(art);
  };

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({ block: 'center' });
    }
  }, [isActive]);

  return { cardRef, isActive, checked, handleDetails, handleCheckboxChange };
};
