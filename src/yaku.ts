import * as R from 'ramda';

import { CalculateParams } from './calculate';
import { Chi, Meld, Pair } from './types/meld';
import { Tile, isTerminal } from './types/tile';

interface YakuCheckerParams {
  tiles: ReadonlyArray<Tile>;
  melds: ReadonlyArray<Meld>;
  params: CalculateParams;
}

const isRiichi = ({ tiles, melds, params }: YakuCheckerParams): number =>
  !params.winState.open && params.winState.riichi ? 1 : 0;

const isIppatsu = ({ tiles, melds, params }: YakuCheckerParams): number =>
  !params.winState.open && params.winState.riichi && params.winState.ippatsu ? 1 : 0;

const isSevenPairs = ({ tiles, melds, params }: YakuCheckerParams): number => {
  const fourteenTiles = tiles.length === 14;
  const sevenPairs = melds.filter((meld) => meld.kind === 'pair').length === 7;
  const closed = !params.winState.open;
  return closed && sevenPairs && fourteenTiles ? 2 : 0;
}

const isTsumo = ({ tiles, melds, params }: YakuCheckerParams): number =>
  params.winState.draw === 'tsumo' ? 1 : 0;

const isPinfu = ({ tiles, melds, params }: YakuCheckerParams): number => {
  // Closed only
  if (params.winState.open) {
    return 0;
  }

  // No pons/kans
  const hasPonsOrKans = melds.some((meld) => ['pon', 'kan'].includes(meld.kind));
  if (hasPonsOrKans) {
    return 0;
  }

  // If there are no terminals it's an all simples hand instead of pinfu
  const handHasTerminal = tiles.some((tile) => isTerminal(tile));
  if (!handHasTerminal) {
    return 0;
  }

  const chis = melds.filter((meld) => meld.kind === 'chi') as ReadonlyArray<Chi>;
  const pairs = melds.filter((meld) => meld.kind === 'pair') as ReadonlyArray<Pair>;

  // Normal hand form
  const standardHand = chis.length === 4 && pairs.length === 1;
  if (!standardHand) {
    return 0;
  }

  const chiWithAgari = chis.find((chi) => chi.value.some((tile) => tile === params.agari));

  // No pair wait
  if (!chiWithAgari) {
    return 0;
  }

  // No middle wait
  if (chiWithAgari.value[1] === params.agari) {
    return 0;
  }

  // No double wait
  const threeTiles: Tile[] = ['pin-3', 'sou-3', 'man-3'];
  if (chiWithAgari.value[2] === params.agari && threeTiles.includes(params.agari)) {
    return 0;
  }
  
  // No double wait
  const sevenTiles: Tile[] = ['pin-7', 'sou-7', 'man-7'];
  if (chiWithAgari.value[0] === params.agari && sevenTiles.includes(params.agari)) {
    return 0;
  }

  return 1;
}

type YakuName =
  | 'riichi'
  | 'ippatsu'
  | 'seven-pairs'
  | 'tsumo'
  | 'pinfu';

type YakuChecker = (y: YakuCheckerParams) => number;

const yakuCheckers: Record<YakuName, YakuChecker> = {
  'riichi': isRiichi,
  'ippatsu': isIppatsu,
  'seven-pairs': isSevenPairs,
  'tsumo': isTsumo,
  'pinfu': isPinfu,
} as const;

export type Yaku = { han: number, name: YakuName };

export const findYaku = (
  tiles: ReadonlyArray<Tile>,
  melds: ReadonlyArray<Meld>,
  params: CalculateParams,
): ReadonlyArray<Yaku> => {
  return R.keys(yakuCheckers).reduce((arr: Yaku[], key: string) => {
    const name = key as YakuName;
    const checker = yakuCheckers[name];
    const han = checker({tiles, melds, params});
    if (han > 0) {
      arr.push({ han, name });
    }
    return arr;
  }, [])
}
