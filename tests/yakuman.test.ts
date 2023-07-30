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

      expect(result).toStrictEqual({ ok: true, score: 32000, yakuman: 'thirteen-orphans'});
    });
  });
});
