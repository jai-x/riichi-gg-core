import * as R from 'ramda';

import { Tile, allTiles } from './types/tile';
import { findMelds } from './melds';
// import { findYakuman } from './yakuman';
import { deDora } from './helpers';

export type Error =
  | TileError
  | ParamsError
  | 'hand-invalid';

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
  agari: Tile,
};

const err = (e: Error): CalculateResult => ({ ok: false, message: e });

export const calculate = (tiles: ReadonlyArray<Tile>, params: CalculateParams): CalculateResult => {
  const tileError = validateTiles(tiles);
  if (tileError) {
    return err(tileError);
  }

  const paramError = validateParams(params);
  if (paramError) {
    return err('params-invalid')
  }

  const melds = findMelds(tiles);
  if (melds.length === 0) {
    return err('hand-invalid');
  }

  // const yakuman = findYakuman(tiles, melds, params);

  throw new Error('Not implemented!');
};

type TileError =
  | 'tiles-invalid'
  | 'tiles-too-few'
  | 'tiles-too-many';

const validateTiles = (tiles: ReadonlyArray<Tile>): TileError | null => {
  if (tiles.length < 14) {
    return 'tiles-too-few';
  }

  if (tiles.length > 18) {
    return 'tiles-too-many';
  }

  if (!tiles.every(t => allTiles.includes(t))) {
    return 'tiles-invalid';
  }

  const numTilesAboveFour = R.pipe(
    R.map(deDora),
    R.countBy((tile: Tile) => String(tile)),
    R.filter((count: number) => count > 4),
    R.keys,
    R.map((tileStr: string) => tileStr as Tile),
    R.length,
  )(tiles);

  if (numTilesAboveFour) {
    return 'tiles-invalid';
  }

  return null;
} 


type ParamsError =
  | 'params-invalid';

export const validateParams = (params: CalculateParams): ParamsError | null => {
  return null;
}