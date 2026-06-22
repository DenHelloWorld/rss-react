import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_TAGS } from '../../consts/api-tags.const.ts';

export type AICArtwork = {
  id: number;
  title: string;
  artist_display: string;
  image_id: string | null;
  thumbnail?: {
    alt_text: string;
  };
};
export type AICPaginationResponse = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
};
export const API_URL = {
  baseURL: 'https://api.artic.edu/api/v1/artworks',
  searchEndpoint: 'search',
};
export type AICResponse = {
  data: AICArtwork[];
  pagination: AICPaginationResponse;
};
export type AICSingleResponse = {
  data: AICArtworkDetails;
};
export type AICArtworkDetails = {
  date_display?: string;
  medium_display?: string;
  place_of_origin?: string;
  dimensions?: string;
} & AICArtwork;
const LIST_FIELDS = 'id,title,artist_display,image_id,thumbnail';
const DETAILS_FIELDS =
  'id,title,artist_display,image_id,thumbnail,date_display,medium_display,place_of_origin,dimensions';
const CACHE_TTL = Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 60;

const buildArtsQueryParams = (
  query: string | undefined,
  page: number,
  limit = 10
): Record<string, string> => {
  const safePage = Number.isInteger(page) && page > 0 ? page : 1;
  const params: Record<string, string> = {
    fields: LIST_FIELDS,
    limit: String(limit),
    page: String(safePage),
  };
  if (query) params.q = query;
  return params;
};

export const artsApi = createApi({
  reducerPath: 'artsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL.baseURL,
  }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: [API_TAGS.ARTS],
  endpoints: (builder) => ({
    searchArts: builder.query<
      AICResponse,
      { query: string | undefined; page: number; limit?: number }
    >({
      query: ({ query, page, limit = 10 }) => ({
        url: query ? API_URL.searchEndpoint : '',
        params: buildArtsQueryParams(query, page, limit),
      }),
      providesTags: () => [{ type: API_TAGS.ARTS, id: API_TAGS.LIST }],
    }),

    getArtById: builder.query<AICSingleResponse, string>({
      query: (id) => ({
        url: id,
        params: {
          fields: DETAILS_FIELDS,
        },
      }),
      providesTags: (result) =>
        result
          ? [{ type: API_TAGS.ARTS, id: result.data.id }]
          : [{ type: API_TAGS.ARTS, id: API_TAGS.DETAIL }],
    }),
  }),
});

export const { useSearchArtsQuery, useGetArtByIdQuery } = artsApi;

export const getArtworkImageUrl = (imageId: string): string =>
  `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

export const fetchArtworks = async (
  query: string,
  page: number,
  limit = 10
): Promise<AICResponse> => {
  const params = new URLSearchParams(buildArtsQueryParams(query, page, limit));
  const url = query
    ? `${API_URL.baseURL}/${API_URL.searchEndpoint}?${params}`
    : `${API_URL.baseURL}?${params}`;

  const res = await fetch(url, { next: { revalidate: CACHE_TTL } });
  if (!res.ok) throw new Error(`AIC API error: ${String(res.status)}`);
  return res.json() as Promise<AICResponse>;
};
