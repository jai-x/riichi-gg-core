import { Tile } from '../src/types/tile';
import { Meld } from '../src/types/meld';
import { findMelds } from '../src/melds';

// Simple array shuffle
const shuffle = <T>(input: ReadonlyArray<T>): ReadonlyArray<T> =>
  input
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

// Matches contents of arrays unsorted
const arrayMatch = <T>(actual: ReadonlyArray<T>, expected: ReadonlyArray<T>): void => {
  expect(actual).toEqual(expect.arrayContaining(expected));
  expect(expected).toEqual(expect.arrayContaining(actual));
};

describe('findMedlds', () => {
  test('example 1', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-1', 'pin-2', 'pin-3',
      'man-4', 'man-5r', 'man-6',
      'sou-9', 'sou-9', 'sou-9',
      'wind-east', 'wind-east', 'wind-east', 'wind-east',
      'dragon-red', 'dragon-red',
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'chi', value: [ 'pin-1', 'pin-2', 'pin-3' ] },
      { kind: 'chi', value: [ 'man-4', 'man-5r', 'man-6' ] },
      { kind: 'kan', value: [ 'wind-east', 'wind-east', 'wind-east', 'wind-east' ] },
      { kind: 'pon', value: [ 'sou-9', 'sou-9', 'sou-9' ] },
      { kind: 'pair', value: [ 'dragon-red', 'dragon-red' ] }
    ];

    arrayMatch(findMelds(tiles), melds);
  });

  test('example 2', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-1', 'pin-2', 'pin-3',
      'pin-4', 'pin-4', 'pin-4',
      'pin-5', 'pin-6', 'pin-7',
      'dragon-green', 'dragon-green', 'dragon-green',
      'man-1', 'man-1'
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'chi', value: [ 'pin-1', 'pin-2', 'pin-3' ] },
      { kind: 'chi', value: [ 'pin-5', 'pin-6', 'pin-7' ] },
      { kind: 'pon', value: [ 'pin-4', 'pin-4', 'pin-4' ] },
      { kind: 'pon', value: [ 'dragon-green', 'dragon-green', 'dragon-green' ] },
      { kind: 'pair', value: [ 'man-1', 'man-1' ] }
    ];

    arrayMatch(findMelds(tiles), melds);
  });
});