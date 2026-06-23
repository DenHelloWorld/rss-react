'use client';

import { type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';
import { isDetailsPathname } from '../../consts/routes.const';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock';

type Props = {
  children: ReactNode;
};

const MainPanel = ({ children }: Props) => {
  const pathname = usePathname();
  const isDetailsLocation = isDetailsPathname(pathname);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    router.push(`/?${searchParams.toString()}`);
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
