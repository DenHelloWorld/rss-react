'use client';

import dynamic from 'next/dynamic';

const ThemeButtonDynamic = dynamic(() => import('./ThemeButton'), {
  ssr: false,
});

export default ThemeButtonDynamic;
