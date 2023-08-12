import { equals } from 'ramda';
import { Tile } from "./types/tile";

export const removeFirstInstance = <T>(input: ReadonlyArray<T>, elem: T): ReadonlyArray<T> => {
  const idx = input.indexOf(elem);
  if (idx < 0) {
    return input;
  }
  return input.filter((_, i) => i !== idx);
}

export const arrayCmp = <T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

export const isThirteenOrphansTiles = (tiles: ReadonlyArray<Tile>): boolean => {
  const thirteenOrphansSet: Set<Tile> = new Set([
    'man-1', 'man-9',
    'pin-1', 'pin-9',
    'sou-1', 'sou-9',
    'wind-east', 'wind-south', 'wind-west', 'wind-north',
    'dragon-green', 'dragon-red', 'dragon-white',
  ]);

  return tiles.length === 14 && equals(thirteenOrphansSet, new Set(tiles));
}