import { Tile } from './types/tile';
import { Meld } from './types/meld';
import { CalculateParams } from './calculate';
import { removeFirstInstance, arrayCmp } from './helpers';

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
  // Closed only
  if (params.winState.open) {
    return false;
  }

  // 14 tiles only
  if (tiles.length !== 14) {
    return false;
  }

  // Only one meld...
  if (melds.length !== 1) {
    return false;
  }

  // ...that is a pair
  if (melds[0].kind !== 'pair') {
    return false;
  }

  // Remove one of the pair tiles from the hand and sort
  const pairTile = melds[0].value[0];
  const inputTilesNoPair = removeFirstInstance(tiles, pairTile);
  const inputTilesNoPairSorted = [...inputTilesNoPair].sort();

  const thirteenOrphansSorted: Tile[] = [
    'dragon-green', 'dragon-red', 'dragon-white',
    'man-1', 'man-9',
    'pin-1', 'pin-9',
    'sou-1', 'sou-9',
    'wind-east', 'wind-north', 'wind-south', 'wind-west',
  ];

  // The remaning sorted tiles should equal this array
  return arrayCmp(thirteenOrphansSorted, inputTilesNoPairSorted);
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
