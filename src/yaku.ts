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

type YakuName =
  | 'riichi'
  | 'ippatsu';

type YakuChecker = (y: YakuCheckerParams) => number;

const yakuCheckers: Record<YakuName, YakuChecker> = {
  'riichi': isRiichi,
  'ippatsu': isIppatsu,
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
