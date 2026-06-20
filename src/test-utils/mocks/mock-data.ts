import type {
  AICArtwork,
  AICArtworkDetails,
  AICPaginationResponse,
} from '../../store/arts/arts-api.ts';

export const MOCK_ART: AICArtwork = {
  id: 123,
  title: 'Starry Night',
  image_id: 'sample-id',
  artist_display: 'Vincent van Gogh',
  thumbnail: { alt_text: 'A beautiful night sky' },
};

export const MOCK_DETAILS: AICArtworkDetails = {
  ...MOCK_ART,
  image_id: 'sample-image-id',
  date_display: '1889',
  medium_display: 'Oil on canvas',
  place_of_origin: 'France',
  dimensions: '73.7 cm × 92.1 cm',
};

export const MOCK_PAGINATION: AICPaginationResponse = {
  total: 100,
  limit: 9,
  offset: 0,
  total_pages: 11,
  current_page: 1,
};
