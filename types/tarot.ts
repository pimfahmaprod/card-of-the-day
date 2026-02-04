/**
 * Core Tarot Types for Valentine's Day App
 */

export type RelationshipStatus = 'single' | 'in_relationship';

export interface TarotCard {
  card_id: string;
  card_name: string;
  image_path: string;
  interpretations: {
    single: string;
    in_relationship: string;
  };
  share_quote: string;
}

export interface TarotCardRaw {
  card_id: string;
  card_name: string;
  readings: {
    love?: string;
    card_of_the_day?: string;
    work?: string;
    finance?: string;
    health?: string;
  };
}

export interface AppState {
  currentScreen: 'landing' | 'instruction' | 'selection' | 'reveal' | 'result';
  relationshipStatus: RelationshipStatus | null;
  selectedCard: TarotCard | null;
}
