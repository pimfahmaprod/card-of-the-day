/**
 * Core Tarot Types for Valentine's Day App
 */

export type RelationshipStatus = 'single' | 'in_relationship';

export interface TarotCard {
  id: number;
  name: string;
  image: string;
  image_path: string;
  interpretation: string;
  personality: string;
  quote: string;
}

export interface TarotCardRaw {
  id: number;
  name: string;
  image: string;
  interpretation: string;
  personality: string;
  quote: string;
}

export interface AppState {
  currentScreen: 'landing' | 'instruction' | 'selection' | 'reveal' | 'result';
  relationshipStatus: RelationshipStatus | null;
  selectedCard: TarotCard | null;
}
