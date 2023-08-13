import * as R from 'ramda';

import { Tile, isDragon, isHonour, isTerminal, isWind } from './types/tile';
import { Meld } from './types/meld';
import { CalculateParams } from './calculate';
import { removeFirstInstance, arrayCmp } from './helpers';

interface YakumanCheckerParams {
  tiles: ReadonlyArray<Tile>;
  melds: ReadonlyArray<Meld>;
  params: CalculateParams;
}

const isThirteenOrphans = ({ tiles, melds, params }: YakumanCheckerParams): boolean =>
  !params.winState.open && melds.length === 1 && melds[0].kind === 'thirteen-orphans'

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
  if (params.winState.open) {
    return false;
  }

  if (melds.length !== 5) {
    return false;
  }

  if (tiles.length !== 14) {
    return false;
  }

  if (melds.some((meld) => meld.kind === 'kan')) {
    return false;
  }

  const findTileToRemove = (tiles: ReadonlyArray<Tile>): Tile | null => {
    const counts = R.countBy((tile) => String(tile))(tiles);

    const fourTiles = R.filter((count: number) => count === 4)(counts);
    if (R.keys(fourTiles).length === 1) {
      return R.keys(fourTiles)[0] as Tile;
    }

    const twoTiles = R.filter((count: number) => count === 2)(counts);
    if (R.keys(twoTiles).length === 1) {
      return R.keys(twoTiles)[0] as Tile;
    }

    for (const dora of ['pin-5r', 'sou-5r', 'man-5r'] as Tile[]) {
      if (R.keys(counts).includes(dora)) {
        return dora;
      }
    }

    return null;
  }

  const tileToRemove = findTileToRemove(tiles);
  if (!tileToRemove) {
    return false
  }

  const tilesToTest = [...removeFirstInstance(tiles, tileToRemove)].sort();

  const nineGatesTileSet: ReadonlyArray<ReadonlyArray<Tile>> = [
    ['pin-1', 'pin-1', 'pin-1', 'pin-2', 'pin-3', 'pin-4', 'pin-5', 'pin-6', 'pin-7', 'pin-8', 'pin-9', 'pin-9', 'pin-9'],
    ['sou-1', 'sou-1', 'sou-1', 'sou-2', 'sou-3', 'sou-4', 'sou-5', 'sou-6', 'sou-7', 'sou-8', 'sou-9', 'sou-9', 'sou-9'],
    ['man-1', 'man-1', 'man-1', 'man-2', 'man-3', 'man-4', 'man-5', 'man-6', 'man-7', 'man-8', 'man-9', 'man-9', 'man-9'],
  ] as const;

  for (const nineGatesTiles of nineGatesTileSet) {
    if (arrayCmp(tilesToTest, nineGatesTiles)) {
      return true;
    }
  }

  return false;
}

type YakumanName =
  | 'thirteen-orphans'
  | 'four-concealed-triplets'
  | 'big-three-dragons'
  | 'little-four-winds'
  | 'big-four-winds'
  | 'all-honours'
  | 'all-terminals'
  | 'all-greens'
  | 'nine-gates';

export type Yakuman = { score: number, name: YakumanName }

type YakumanChecker = (y: YakumanCheckerParams) => boolean;

const yakumanCheckers: Record<YakumanName, YakumanChecker> = {
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

const DEALER_SCORE     = 48_000 as const;
const NON_DEALER_SCORE = 32_000 as const;

export const findYakuman = (
  tiles: ReadonlyArray<Tile>,
  melds: ReadonlyArray<Meld>,
  params: CalculateParams,
): ReadonlyArray<Yakuman> =>
  R.pipe(
    R.filter((checker: YakumanChecker) => checker({tiles, melds, params})),
    R.keys,
    R.map((name: string) => ({
      name: (name as YakumanName),
      score: params.dealer ? DEALER_SCORE : NON_DEALER_SCORE,
    }))
  )(yakumanCheckers);