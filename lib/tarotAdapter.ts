/**
 * Valentine's Day Tarot Adapter
 * Major Arcana only - ใครจะเข้ามาในชีวิตคุณช่วงวาเลนไทน์
 */

import { TarotCard, TarotCardRaw } from '@/types/tarot';
import valentineData from '@/valentine_tarot.json';

/**
 * Convert raw tarot card data to our app format
 */
export function adaptTarotCard(rawCard: TarotCardRaw): TarotCard {
  return {
    id: rawCard.id,
    name: rawCard.name,
    image: rawCard.image,
    image_path: `/images/tarot/${rawCard.image}`,
    interpretation: rawCard.interpretation,
    personality: rawCard.personality,
    quote: rawCard.quote,
  };
}

/**
 * Load and adapt all tarot cards (Major Arcana only - 22 cards)
 */
export function getAllTarotCards(): TarotCard[] {
  const rawCards = valentineData.cards as TarotCardRaw[];
  return rawCards.map(adaptTarotCard);
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleCards(cards: TarotCard[]): TarotCard[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get a random vertical offset for card positioning
 * Returns a value between -20 and 20 pixels
 */
export function getRandomCardOffset(): number {
  return Math.random() * 40 - 20;
}
