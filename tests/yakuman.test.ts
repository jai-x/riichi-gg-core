import { sample } from './helpers';

import { Tile } from '../src/types/tile';
// import { Meld } from '../src/types/meld';
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

      expect(result).toStrictEqual({ ok: true, score: 32000, yakuman: ['thirteen-orphans']});
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

      expect(result).toStrictEqual({ ok: true, score: 32000, yakuman: ['four-concealed-triplets']});
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

      expect(result).toStrictEqual({ ok: true, score: 32000, yakuman: ['big-three-dragons']});
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

      expect(result).toStrictEqual({ ok: true, score: 32000, yakuman: ['little-four-winds']});
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

      expect(result).toStrictEqual({
        ok: true,
        score: 64000,
        yakuman: ['four-concealed-triplets', 'big-four-winds'],
      });
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

      expect(result).toStrictEqual({
        ok: true,
        score: 64000,
        yakuman: ['four-concealed-triplets', 'all-honours'],
      });
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

      expect(result).toStrictEqual({
        ok: true,
        score: 64000,
        yakuman: ['four-concealed-triplets', 'all-terminals'],
      });
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

      expect(result).toStrictEqual({
        ok: true,
        score: 32000,
        yakuman: ['all-greens'],
      });
    });
  });
});
