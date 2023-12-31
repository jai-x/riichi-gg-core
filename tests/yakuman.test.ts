import { sample } from './helpers';

import { Tile } from '../src/types/tile';
import { findYakuman } from '../src/yakuman';
import { findMelds } from '../src/melds';

describe('findYakuman', () => {
  describe('thirteen orphans', () => {
    const tiles: Tile[] = [
      'pin-1', 'pin-9',
      'sou-1', 'sou-9',
      'man-1', 'man-9',
      'wind-east', 'wind-south', 'wind-west', 'wind-north',
      'dragon-white', 'dragon-green', 'dragon-red',
    ];
    const last: Tile = sample(tiles);

    const hand = tiles.concat([last]);
    const melds = findMelds(hand);

    test('it returns thirteen orphans', () => {
      // @ts-expect-error
      const result = findYakuman(hand, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'thirteen-orphans' },
      ]);
    });
  });

  describe('four concealed triplets', () => {
    const tiles: Tile[] = [
      'pin-1', 'pin-1', 'pin-1',
      'sou-9', 'sou-9', 'sou-9', 'sou-9',
      'man-5r', 'man-5', 'man-5',
      'wind-east', 'wind-east', 'wind-east',
      'dragon-red', 'dragon-red',
    ];
    const melds = findMelds(tiles);

    test('it returns four concealed triplets', () => {
      // @ts-expect-error
      const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'four-concealed-triplets' },
      ]);
    });
  });

  describe('big three dragons', () => {
    const tiles: Tile[] = [
      'dragon-red', 'dragon-red', 'dragon-red',
      'dragon-green', 'dragon-green', 'dragon-green',
      'dragon-white', 'dragon-white', 'dragon-white',
      'man-5r', 'man-6', 'man-7',
      'wind-east', 'wind-east'
    ];
    const melds = findMelds(tiles);

    test('it returns big three dragons', () => {
      // @ts-expect-error
      const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'big-three-dragons'},
      ]);
    });
  });

  describe('little four winds', () => {
    const tiles: Tile[] = [
      'man-5r', 'man-6', 'man-7',
      'wind-east', 'wind-east', 'wind-east',
      'wind-south', 'wind-south', 'wind-south',
      'wind-west', 'wind-west', 'wind-west',
      'wind-north', 'wind-north',
    ];
    const melds = findMelds(tiles);

    test('it returns little four winds', () => {
      // @ts-expect-error
      const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'little-four-winds' },
      ]);
    });
  });

  describe('big four winds', () => {
    const tiles: Tile[] = [
      'wind-east', 'wind-east', 'wind-east',
      'wind-south', 'wind-south', 'wind-south',
      'wind-west', 'wind-west', 'wind-west',
      'wind-north', 'wind-north', 'wind-north',
      'man-5r', 'man-5',
    ];
    const melds = findMelds(tiles);

    test('it returns big four winds', () => {
      // @ts-expect-error
      const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'four-concealed-triplets' },
        { score: 32000, name: 'big-four-winds' },
      ]);
    });
  });

  describe('all honours', () => {
    const tiles: Tile[] = [
      'wind-east', 'wind-east', 'wind-east',
      'wind-south', 'wind-south', 'wind-south',
      'dragon-red', 'dragon-red', 'dragon-red',
      'dragon-white', 'dragon-white', 'dragon-white',
      'wind-west', 'wind-west',
    ];
    const melds = findMelds(tiles);

    test('it returns all honours', () => {
      // @ts-expect-error
      const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'four-concealed-triplets' },
        { score: 32000, name: 'all-honours' },
      ]);
    });
  });

  describe('all terminals', () => {
    const tiles: Tile[] = [
      'man-1', 'man-1', 'man-1',
      'pin-1', 'pin-1', 'pin-1',
      'pin-9', 'pin-9', 'pin-9',
      'sou-9', 'sou-9', 'sou-9',
      'sou-1', 'sou-1',
    ];
    const melds = findMelds(tiles);

    test('it returns all terminals', () => {
      // @ts-expect-error
      const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'four-concealed-triplets' },
        { score: 32000, name: 'all-terminals' },
      ]);
    });
  });

  describe('all greens', () => {
    const tiles: Tile[] = [
      'sou-2', 'sou-3', 'sou-4',
      'sou-2', 'sou-3', 'sou-4',
      'sou-6', 'sou-6', 'sou-6',
      'sou-8', 'sou-8', 'sou-8', 'sou-8',
      'dragon-green', 'dragon-green',
    ];
    const melds = findMelds(tiles);

    test('it returns all greens', () => {
      // @ts-expect-error
      const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

      expect(result).toStrictEqual([
        { score: 32000, name: 'all-greens' },
      ]);
    });
  });

  describe('nine gates', () => {
    const hand: Tile[] = [
      'pin-1', 'pin-1', 'pin-1',
      'pin-2',
      'pin-3',
      'pin-4',
      'pin-5',
      'pin-6',
      'pin-7',
      'pin-8',
      'pin-9', 'pin-9', 'pin-9',
    ];

    describe('when agari is a one', () => {
      const agari: Tile = 'pin-1';
      const tiles = hand.concat(agari);
      const melds = findMelds(tiles);

      test('it returns nine gates', () => {
        // @ts-expect-error
        const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

        expect(result).toStrictEqual([
          { score: 32000, name: 'nine-gates' },
        ]);
      });
    });

    describe('when agari is a nine', () => {
      const agari: Tile = 'pin-9';
      const tiles = hand.concat(agari);
      const melds = findMelds(tiles);

      test('it returns nine gates', () => {
        // @ts-expect-error
        const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

        expect(result).toStrictEqual([
          { score: 32000, name: 'nine-gates' },
        ]);
      });
    });

    describe('when agari is a simple', () => {
      const agari: Tile = 'pin-7';
      const tiles = hand.concat(agari);
      const melds = findMelds(tiles);

      test('it returns nine gates', () => {
        // @ts-expect-error
        const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

        expect(result).toStrictEqual([
          { score: 32000, name: 'nine-gates' },
        ]);
      });
    });

    describe('when agari is a red five', () => {
      const agari: Tile = 'pin-5r';
      const tiles = hand.concat(agari);
      const melds = findMelds(tiles);

      test('it returns nine gates', () => {
        // @ts-expect-error
        const result = findYakuman(tiles, melds, { dealer: false, winState: { open: false }});

        expect(result).toStrictEqual([
          { score: 32000, name: 'nine-gates' },
        ]);
      });
    });
  });
});
