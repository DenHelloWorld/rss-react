import { type ChangeEvent, useEffect, useRef } from 'react';
import { ROUTES } from '../../consts/routes.const.ts';
import { useArtworkSelection } from '../useArtworkSelection/useArtworkSelection.ts';
import type { AICArtwork } from '../../store/arts/arts-api.ts';
import { useLocation, useNavigate, useParams } from 'react-router';

export const useAICCard = (art: AICArtwork) => {
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

  const handleCheckboxChange = (e?: ChangeEvent | MouseEvent) => {
    e?.stopPropagation();
    toggle(art);
  };

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [isActive]);

  return {
    cardRef,
    isActive,
    checked,
    handleDetails,
    handleCheckboxChange,
  };
};
