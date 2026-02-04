/**
 * Adapter to convert existing tarot_cards.json structure
 * to our Valentine's Day app structure
 */

import { TarotCard, TarotCardRaw } from '@/types/tarot';
import tarotData from '@/tarot_cards.json';

/**
 * Extract share quote from love reading
 * Takes the first meaningful sentence as the share quote
 */
function extractShareQuote(loveReading: string): string {
  const sentences = loveReading
    .split(/[.!?]/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 150);

  return sentences[0] || loveReading.substring(0, 120) + '...';
}

/**
 * Split love reading into single and in_relationship interpretations
 * The existing data often has both contexts in one reading
 */
function splitLoveReading(loveReading: string): {
  single: string;
  in_relationship: string;
} {
  // Check if reading explicitly mentions both contexts
  const parts = loveReading.split(/\n\nส่วนคนมีคู่|สำหรับคนมีคู่/);

  if (parts.length > 1) {
    return {
      single: parts[0].trim(),
      in_relationship: parts[1].trim(),
    };
  }

  // If no explicit split, use context clues to determine or use the same for both
  if (loveReading.includes('คนโสด') || loveReading.includes('พบเจอคนใหม่')) {
    return {
      single: loveReading,
      in_relationship: loveReading.replace(/คนโสด/g, 'คุณ'),
    };
  }

  // Default: use the same reading for both contexts
  return {
    single: loveReading,
    in_relationship: loveReading,
  };
}

/**
 * Convert raw tarot card data to our app format
 */
export function adaptTarotCard(rawCard: TarotCardRaw): TarotCard {
  const loveReading = rawCard.readings.love || rawCard.readings.card_of_the_day || '';
  const { single, in_relationship } = splitLoveReading(loveReading);

  return {
    card_id: rawCard.card_id,
    card_name: rawCard.card_name,
    image_path: `/images/tarot/${rawCard.card_name}.png`,
    interpretations: {
      single,
      in_relationship,
    },
    share_quote: extractShareQuote(loveReading),
  };
}

/**
 * Load and adapt all tarot cards
 */
export function getAllTarotCards(): TarotCard[] {
  const rawCards = tarotData.tarot_cards as TarotCardRaw[];
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
