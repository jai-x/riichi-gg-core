import { Tile, allTiles } from './types/tile';
import { findMelds } from './melds';
import { findYakuman } from './yakuman';

export type Error =
  | 'tiles-invalid'
  | 'tiles-too-few'
  | 'tiles-too-many';

export type CalculateResult =
  | { ok: false, message: Error }
  | { ok: true, message: string, score: number, yaku: ReadonlyArray<string> };

export type WinState =
  | { open: true,  draw: 'ron',   }
  | { open: true,  draw: 'tsumo', }
  | { open: false, draw: 'ron',   riichi: false }
  | { open: false, draw: 'tsumo', riichi: false }
  | { open: false, draw: 'ron',   riichi: true, ippatsu: false }
  | { open: false, draw: 'tsumo', riichi: true, ippatsu: false }
  | { open: false, draw: 'ron',   riichi: true, ippatsu: true }
  | { open: false, draw: 'tsumo', riichi: true, ippatsu: true };

export type CalculateParams = {
  dealer: boolean,
  winState: WinState,
};

const err = (e: Error): CalculateResult => ({ ok: false, message: e });

export const calculate = (tiles: ReadonlyArray<Tile>, params: CalculateParams): CalculateResult => {
  if (tiles.length < 14) {
    return err('tiles-too-few');
  }

  if (tiles.length > 18) {
    return err('tiles-too-many');
  }

  if (!tiles.every(t => allTiles.includes(t))) {
    return err('tiles-invalid');
  }

  const melds = findMelds(tiles);
  const yakuman = findYakuman(tiles, melds, params);

  throw new Error('Not implemented!');
};