import { shuffle, arrayMatch } from './helpers';

import { Tile } from '../src/types/tile';
import { Meld } from '../src/types/meld';
import { findMelds } from '../src/melds';

describe('findMelds', () => {
  test('kan over chi priority', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-2', 'pin-3', 'pin-4',
      'man-5r', 'man-5', 'man-5', 'man-5',
      'dragon-red', 'dragon-red', 'dragon-red',
      'wind-east', 'wind-east', 'wind-east',
      'sou-9', 'sou-9'
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'chi', value: [ 'pin-2', 'pin-3', 'pin-4' ] },
      { kind: 'kan', value: [ 'man-5r', 'man-5', 'man-5', 'man-5' ] },
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

  test('dont break chis', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-1', 'pin-2', 'pin-3',
      'pin-2', 'pin-3', 'pin-4',
      'pin-3', 'pin-4', 'pin-5',
      'dragon-green', 'dragon-green', 'dragon-green',
      'pin-4', 'pin-4'
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'chi', value: [ 'pin-1', 'pin-2', 'pin-3' ] },
      { kind: 'chi', value: [ 'pin-2', 'pin-3', 'pin-4' ] },
      { kind: 'chi', value: [ 'pin-3', 'pin-4', 'pin-5' ] },
      { kind: 'pon', value: [ 'dragon-green', 'dragon-green', 'dragon-green' ] },
      { kind: 'pair', value: [ 'pin-4', 'pin-4' ] },
    ];

    arrayMatch(findMelds(tiles), melds);
  });

  test('seven pairs', () => {
    const tiles: ReadonlyArray<Tile> = shuffle([
      'pin-1', 'pin-1',
      'sou-9', 'sou-9',
      'man-5r', 'man-5',
      'wind-east', 'wind-east',
      'dragon-red', 'dragon-red',
      'sou-5', 'sou-5r',
      'wind-south', 'wind-south',
    ]);

    const melds: ReadonlyArray<Meld> = [
      { kind: 'pair', value: [ 'pin-1', 'pin-1' ] },
      { kind: 'pair', value: [ 'sou-9', 'sou-9' ] },
      { kind: 'pair', value: [ 'man-5r', 'man-5' ] },
      { kind: 'pair', value: [ 'wind-east', 'wind-east' ] },
      { kind: 'pair', value: [ 'dragon-red', 'dragon-red' ] },
      { kind: 'pair', value: [ 'sou-5r', 'sou-5' ] },
      { kind: 'pair', value: [ 'wind-south', 'wind-south' ] },
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

  describe('nine gates', () => {
    test('when agari is not 1 or 9', () => {
      const tiles: ReadonlyArray<Tile> = shuffle([
        'pin-1', 'pin-1', 'pin-1',
        'pin-2',
        'pin-3',
        'pin-4',
        'pin-5',
        'pin-6',
        'pin-7',
        'pin-8',
        'pin-9', 'pin-9', 'pin-9',

        'pin-5r',
      ]);

      const expectedMelds: ReadonlyArray<Meld> = [
        { kind: 'pon', value: [ 'pin-1', 'pin-1', 'pin-1' ] },
        { kind: 'pon', value: [ 'pin-9', 'pin-9', 'pin-9' ] },
        { kind: 'pair', value: [ 'pin-5r', 'pin-5' ] },
        { kind: 'chi', value: [ 'pin-2', 'pin-3', 'pin-4' ] },
        { kind: 'chi', value: [ 'pin-6', 'pin-7', 'pin-8' ] },
      ];

      arrayMatch(findMelds(tiles), expectedMelds);
    });

    test('when agari is 1', () => {
      const tiles: ReadonlyArray<Tile> = shuffle([
        'pin-1', 'pin-1', 'pin-1',
        'pin-2',
        'pin-3',
        'pin-4',
        'pin-5',
        'pin-6',
        'pin-7',
        'pin-8',
        'pin-9', 'pin-9', 'pin-9',

        'pin-1',
      ]);

      const expectedMelds: ReadonlyArray<Meld> = [
        { kind: 'pon', value: [ 'pin-1', 'pin-1', 'pin-1' ] },
        { kind: 'pair', value: [ 'pin-9', 'pin-9' ] },
        { kind: 'chi', value: [ 'pin-1', 'pin-2', 'pin-3' ] },
        { kind: 'chi', value: [ 'pin-4', 'pin-5', 'pin-6' ] },
        { kind: 'chi', value: [ 'pin-7', 'pin-8', 'pin-9' ] },
      ];

      arrayMatch(findMelds(tiles), expectedMelds);
    });
  });
});