import type {
  AICArtwork,
  AICPaginationResponse,
} from '../store/arts/arts-api.ts';

export const MOCK_ART: AICArtwork = {
  id: 123,
  title: 'Starry Night',
  image_id: 'sample-id',
  artist_display: 'Vincent van Gogh',
  thumbnail: { alt_text: 'A beautiful night sky' },
};

export const MOCK_PAGINATION: AICPaginationResponse = {
  total: 100,
  limit: 9,
  offset: 0,
  total_pages: 11,
  current_page: 1,
};
