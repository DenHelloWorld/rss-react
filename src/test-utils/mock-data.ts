import type { AICArtwork } from '../services/AICApiService.ts';

export const MOCK_ART: AICArtwork = {
  id: 123,
  title: 'Starry Night',
  image_id: 'sample-id',
  artist_display: 'Vincent van Gogh',
  thumbnail: { alt_text: 'A beautiful night sky' },
};
