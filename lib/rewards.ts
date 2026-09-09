export const GIFT_COIN_THRESHOLD = 570;
export const TOTAL_LEARNING_COINS = 600;

export function giftUnlocked(total: number) {
  return Number.isFinite(total) && total >= GIFT_COIN_THRESHOLD && total <= TOTAL_LEARNING_COINS;
}
