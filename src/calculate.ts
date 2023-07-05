import { Tile, allTiles } from './types/tile';
import { findMelds } from './melds';

export type Error =
  | 'tiles-invalid'
  | 'tiles-too-few'
  | 'tiles-too-many';

export type CalculateResult =
  | { ok: false, message: Error }
  | { ok: true, message: string, score: number, yaku: ReadonlyArray<string> };

export type WinState =
  | { draw: 'ron',   open: true }
  | { draw: 'tsumo', open: true }
  | { draw: 'ron',   open: false, riichi: false }
  | { draw: 'tsumo', open: false, riichi: false }
  | { draw: 'ron',   open: false, riichi: true, ippatsu: false }
  | { draw: 'tsumo', open: false, riichi: true, ippatsu: false }
  | { draw: 'ron',   open: false, riichi: true, ippatsu: true }
  | { draw: 'tsumo', open: false, riichi: true, ippatsu: true };

export type CalcuateParams = {
  dealer: boolean,
  winState: WinState,
};

const err = (e: Error): CalculateResult => ({ ok: false, message: e });

export const calculate = (tiles: ReadonlyArray<Tile>, _params: CalcuateParams): CalculateResult => {
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

  throw new Error('Not implemented!');
};