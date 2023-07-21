import { Tile } from './types/tile';
import { Meld } from './types/meld';
import { CalculateParams } from './calculate';

export type Yakuman =
  | 'thirteen-orphans'
  | 'four-concealed-triplets'
  | 'big-three-dragons'
  | 'little-four-winds'
  | 'big-four-winds'
  | 'all-honours'
  | 'all-terminals'
  | 'all-greens'
  | 'nine-gates';

export type YakumanResult =
  | { ok: false }
  | { ok: true, score: number, yakuman: Yakuman };

interface YakumanCheckerParams {
  tiles: ReadonlyArray<Tile>;
  melds: ReadonlyArray<Meld>;
  params: CalculateParams;
}

const DEALER_SCORE     = 48_000;
const NON_DEALER_SCORE = 32_000;

const isThirteenOrphans = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isFourConcealedTriplets = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isBigThreeDragons = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isLittleFourWinds = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isBigFourWinds = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isAllHonours = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isAllTerminals = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isAllGreens = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const isNineGates = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  throw new Error('Not implemented!');
}

const yakumanCheckers: Record<Yakuman, (y: YakumanCheckerParams) => boolean> = {
  'thirteen-orphans': isThirteenOrphans,
  'four-concealed-triplets': isFourConcealedTriplets,
  'big-three-dragons': isBigThreeDragons,
  'little-four-winds': isLittleFourWinds,
  'big-four-winds': isBigFourWinds,
  'all-honours': isAllHonours,
  'all-terminals': isAllTerminals,
  'all-greens': isAllGreens,
  'nine-gates': isNineGates,
} as const;

export const findYakuman = (
  tiles: ReadonlyArray<Tile>,
  melds: ReadonlyArray<Meld>,
  params: CalculateParams,
): YakumanResult => {
  for (const key in yakumanCheckers) {
    const yakuman = key as Yakuman;
    const checker = yakumanCheckers[yakuman];
    const found = checker({tiles, melds, params });
    
    if (found) {
      const score = params.dealer ? DEALER_SCORE : NON_DEALER_SCORE;

      return { ok: true, score: score, yakuman: yakuman };
    }
  }

  return { ok: false }
};
