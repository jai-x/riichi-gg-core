import * as R from 'ramda';

import { CalculateParams } from './calculate';
import { Meld } from './types/meld';
import { Tile } from './types/tile';

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

type YakuName =
  | 'riichi'
  | 'ippatsu'
  | 'seven-pairs'
  | 'tsumo';

type YakuChecker = (y: YakuCheckerParams) => number;

const yakuCheckers: Record<YakuName, YakuChecker> = {
  'riichi': isRiichi,
  'ippatsu': isIppatsu,
  'seven-pairs': isSevenPairs,
  'tsumo': isTsumo,
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
