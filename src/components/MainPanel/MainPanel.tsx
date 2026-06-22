'use client';

import { type ReactNode } from 'react';
import { usePathname } from '../../i18n/navigation';
import { isDetailsPathname } from '../../consts/routes.const';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams/useUpdateSearchParams';

type Props = {
  children: ReactNode;
};

const MainPanel = ({ children }: Props) => {
  const pathname = usePathname();
  const isDetailsLocation = isDetailsPathname(pathname);
  const updateSearchParams = useUpdateSearchParams();

  const handleClose = () => {
    updateSearchParams({}, '/');
  };

  const clickableBlockProps = useClickableBlock({ onClick: handleClose });

  return (
    <div
      {...clickableBlockProps}
      className={`relative main-panel ${isDetailsLocation ? 'main-panel--aside' : ''}`}
    >
      {children}
    </div>
  );
};

export default MainPanel;
