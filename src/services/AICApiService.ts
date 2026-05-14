import { HTTP_STATUS } from '../consts/http-status.const.ts';

export interface AICArtwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string | null;
  thumbnail?: {
    alt_text: string;
  };
}

export interface AICArtworkDetails extends AICArtwork {
  date_display?: string;
  medium_display?: string;
  place_of_origin?: string;
  dimensions?: string;
}

export interface AICResponse {
  data: AICArtwork[];
  pagination: AICPaginationResponse;
}

export interface AICSingleResponse {
  data: AICArtworkDetails;
}

const API_URL = {
  baseURL: 'https://api.artic.edu/api/v1/artworks',
  searchEndpoint: 'search',
};

export interface AICPaginationResponse {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface AICPagination {
  page?: string;
  limit?: string;
}

export const AICApiService = {
  async search(
    query: string | undefined,
    { limit = '9', page = '1' }: AICPagination = {}
  ): Promise<AICResponse> {
    const params = new URLSearchParams({
      fields: 'id,title,artist_display,image_id,thumbnail',
      limit,
      page,
    });

    if (query) {
      params.append('q', query);
    }

    const url = new URL(
      query ? API_URL.searchEndpoint : '',
      API_URL.baseURL + '/'
    );

    url.search = params.toString();

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return (await response.json()) as AICResponse;
  },

  async getById(id: string): Promise<AICSingleResponse> {
    const params = new URLSearchParams({
      fields:
        'id,title,artist_display,image_id,thumbnail,date_display,medium_display,place_of_origin,dimensions',
    });

    const url = new URL(`${API_URL.baseURL}/${id}`);
    url.search = params.toString();

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === HTTP_STATUS.NOT_FOUND) {
        throw new Error('Artwork not found');
      }

      throw new Error('Failed to fetch artwork details');
    }

    return (await response.json()) as AICSingleResponse;
  },

  getImageUrl: (imageId: string): string => {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  },
};
