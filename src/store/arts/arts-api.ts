import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface AICArtwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string | null;
  thumbnail?: {
    alt_text: string;
  };
}
export interface AICPaginationResponse {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}
export const API_URL = {
  baseURL: 'https://api.artic.edu/api/v1/artworks',
  searchEndpoint: 'search',
};
export interface AICResponse {
  data: AICArtwork[];
  pagination: AICPaginationResponse;
}
export interface AICSingleResponse {
  data: AICArtworkDetails;
}
export interface AICArtworkDetails extends AICArtwork {
  date_display?: string;
  medium_display?: string;
  place_of_origin?: string;
  dimensions?: string;
}

export const artsApi = createApi({
  reducerPath: 'artsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL.baseURL,
  }),
  endpoints: (builder) => ({
    searchArts: builder.query<
      AICResponse,
      { query: string | undefined; page: number; limit?: number }
    >({
      query: ({ query, page, limit = 9 }) => {
        const safePage = Number.isInteger(page) && page > 0 ? page : 1;
        const params: Record<string, string> = {
          fields: 'id,title,artist_display,image_id,thumbnail',
          limit: String(limit),
          page: String(safePage),
        };

        if (query) {
          params.q = query;
        }

        return {
          url: query ? API_URL.searchEndpoint : '',
          params,
        };
      },
    }),

    getArtById: builder.query<AICSingleResponse, string>({
      query: (id) => ({
        url: id,
        params: {
          fields:
            'id,title,artist_display,image_id,thumbnail,date_display,medium_display,place_of_origin,dimensions',
        },
      }),
    }),
  }),
});

export const { useSearchArtsQuery, useGetArtByIdQuery } = artsApi;

export const getArtworkImageUrl = (imageId: string): string =>
  `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
