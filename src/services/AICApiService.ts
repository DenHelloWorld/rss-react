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
    const fields = 'id,title,artist_display,image_id,thumbnail';
    const limit = 9;

    const endpoint = query
      ? `${BASE_URL}/search?q=${query}&fields=${fields}&limit=${limit}`
      : `${BASE_URL}?fields=${fields}&limit=${limit}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  },

  getImageUrl(imageId: string | null): string {
    if (!imageId) return 'https://via.placeholder.com/400x300?text=No+Image';
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  },
};
