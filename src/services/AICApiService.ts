export interface AICArtwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string | null;
  thumbnail?: {
    alt_text: string;
  };
}

export interface AICResponse {
  data: AICArtwork[];
}

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const AICApiService = {
  async search(query: string | undefined): Promise<AICResponse> {
    const params = new URLSearchParams({
      fields: 'id,title,artist_display,image_id,thumbnail',
      limit: '9',
      page: '1',
    });

    if (query) {
      params.append('q', query);
    }

    const url = query
      ? `${BASE_URL}/search?${params.toString()}`
      : `${BASE_URL}?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  },

  getImageUrl(imageId: string): string {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  },
};
