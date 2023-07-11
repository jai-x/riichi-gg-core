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

describe('findMelds', () => {
  test('kan over chi priority', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-2', 'pin-3', 'pin-4',
      'man-5r', 'man-5r', 'man-5r', 'man-5r',
      'dragon-red', 'dragon-red', 'dragon-red',
      'wind-east', 'wind-east', 'wind-east',
      'sou-9', 'sou-9'
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'chi', value: [ 'pin-2', 'pin-3', 'pin-4' ] },
      { kind: 'kan', value: [ 'man-5r', 'man-5r', 'man-5r', 'man-5r' ] },
      { kind: 'pon', value: [ 'dragon-red', 'dragon-red', 'dragon-red' ] },
      { kind: 'pon', value: [ 'wind-east', 'wind-east', 'wind-east' ] },
      { kind: 'pair', value: [ 'sou-9', 'sou-9' ] },
    ];

    arrayMatch(findMelds(tiles), melds);
  });

  test('pon over chi priority', () => {
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

  test('pair over chi priority', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-1', 'pin-2', 'pin-3',
      'sou-4', 'sou-4', 'sou-4',
      'pin-5', 'pin-6', 'pin-7',
      'dragon-green', 'dragon-green', 'dragon-green',
      'pin-4', 'pin-4'
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'chi', value: [ 'pin-1', 'pin-2', 'pin-3' ] },
      { kind: 'chi', value: [ 'pin-5', 'pin-6', 'pin-7' ] },
      { kind: 'pon', value: [ 'sou-4', 'sou-4', 'sou-4' ] },
      { kind: 'pon', value: [ 'dragon-green', 'dragon-green', 'dragon-green' ] },
      { kind: 'pair', value: [ 'pin-4', 'pin-4' ] },
    ];

    arrayMatch(findMelds(tiles), melds);
  });

  test('thirteen orphans', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-1', 'pin-9',
      'sou-1', 'sou-9',
      'man-1', 'man-9',
      'dragon-green', 'dragon-red', 'dragon-white',
      'wind-east', 'wind-west', 'wind-south', 'wind-north',
      'pin-1'
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'pair', value: [ 'pin-1', 'pin-1' ] }
    ];

    arrayMatch(findMelds(tiles), melds);
  });
});