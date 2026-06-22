'use server';

import { revalidateTag } from 'next/cache';
import { API_TAGS } from '../consts/api-tags.const';

const CACHE_TTL = Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 300;

export const revalidateAll = async (): Promise<void> => {
  revalidateTag(API_TAGS.ARTS, { expire: CACHE_TTL });
};
