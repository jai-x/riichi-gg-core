import { Tile, isDragon, isHonour, isTerminal, isWind } from './types/tile';
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
  | { ok: true, score: number, yakuman: ReadonlyArray<Yakuman> };

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

  // One pair
  const pairs = melds.filter((meld) => meld.kind === 'pair');
  if (pairs.length !== 1) {
    return false
  }

  // Remove one of the pair tiles from the hand and sort
  const pairTile = pairs[0].value[0];
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
  const pairs = melds.filter((meld) => ['pair'].includes(meld.kind));

  const ponsKans = melds.filter((meld) => ['pon', 'kan'].includes(meld.kind));

  return !params.winState.open && pairs.length === 1 && ponsKans.length === 4 && melds.length === 5;
}

const isBigThreeDragons = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  const dragonPonKans = melds.filter((meld) =>
    ['pon', 'kan'].includes(meld.kind) && isDragon(meld.value[0])
  );
  
  return dragonPonKans.length === 3;
}

const isLittleFourWinds = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  const windPairs = melds.filter((meld) => meld.kind === 'pair' && isWind(meld.value[0]));

  const windPonKans = melds.filter((meld) =>
    ['pon', 'kan'].includes(meld.kind) && isWind(meld.value[0])
  );

  return windPairs.length === 1 && windPonKans.length === 3;
}

const isBigFourWinds = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  const windPonKans = melds.filter((meld) =>
    ['pon', 'kan'].includes(meld.kind) && isWind(meld.value[0])
  );

  return windPonKans.length === 4;
}

const isAllHonours = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  const honourPairs = melds.filter((meld) =>
    ['pair'].includes(meld.kind) && isHonour(meld.value[0])
  );

  const honourPonKans = melds.filter((meld) =>
     ['pon', 'kan'].includes(meld.kind) && isHonour(meld.value[0])
  );

  return honourPairs.length === 1 && honourPonKans.length === 4 && melds.length === 5;
}

const isAllTerminals = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  const allMeldsAreTerminal = melds.every((meld) =>
    ['pair', 'pon', 'kan'].includes(meld.kind) && isTerminal(meld.value[0])
  );

  const meldTileCount = melds.reduce((count, meld) => count + meld.value.length, 0)

  return meldTileCount === tiles.length && allMeldsAreTerminal;
}

const isAllGreens = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  const greens = ['sou-2', 'sou-3', 'sou-4', 'sou-6', 'sou-8', 'dragon-green'];

  return tiles.every((tile) => greens.includes(tile));
}

const isNineGates = ({ tiles, melds, params }: YakumanCheckerParams): boolean => {
  // TODO: Implement
  return false;
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
  let finalScore = 0;
  let finalYakuman: Yakuman[] = [];
  
  for (const key in yakumanCheckers) {
    const yakuman = key as Yakuman;
    const checker = yakumanCheckers[yakuman];
    const found = checker({tiles, melds, params });
    
    if (found) {
      const score = params.dealer ? DEALER_SCORE : NON_DEALER_SCORE;

      finalScore += score;
      finalYakuman.push(yakuman);
    }
  }

  if (!finalScore) {
    return { ok: false };
  }

  return { ok: true, score: finalScore, yakuman: finalYakuman };
};
