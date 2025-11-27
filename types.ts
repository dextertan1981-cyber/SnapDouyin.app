export interface VideoData {
  id: string;
  platform: 'douyin' | 'tiktok' | 'other';
  title: string;
  author: string;
  coverUrl: string;
  videoUrlNoWatermark: string;
  audioUrl: string;
  duration: string; // e.g., "00:59"
  stats: {
    plays: string;
    likes: string;
  };
}

export interface AdSlotProps {
  slotId: string;
  format: 'banner' | 'rectangle' | 'vertical';
  className?: string;
  debugLabel?: string;
}

export interface GeminiResponse {
  hashtags: string[];
  summary: string;
  viralCaption: string;
}
