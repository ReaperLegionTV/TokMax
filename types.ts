export interface TikTokAnalysis {
  viralHooks: string[];
  caption: string;
  hashtags: string[];
  seoKeywords: string[];
  viralityScore: number;
  improvementTips: string[];
  explanation: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ImageUpload {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}
