import { CalculateParams, WinState } from "../src/calculate";
import { findMelds } from "../src/melds";
import { Tile } from "../src/types/tile";
import { findYaku } from "../src/yaku";

describe('findYaku', () => {
  describe('when riichi', () => {
    it('returns riichi with 1 han', () => {
      const winState: WinState = { open: false, draw: 'ron', riichi: true, ippatsu: false }

      // @ts-expect-error
      const result = findYaku([], [], { winState });

      expect(result).toStrictEqual([
        { han: 1, name: 'riichi' },
      ]);
    });
  });

  describe('when riichi ippatsu', () => {
    it('returns riichi and ippatsu with 1 han', () => {
      const winState: WinState = { open: false, draw: 'ron', riichi: true, ippatsu: true }

      // @ts-expect-error
      const result = findYaku([], [], { winState });

      expect(result).toStrictEqual([
        { han: 1, name: 'riichi' },
        { han: 1, name: 'ippatsu' },
      ]);
    });
  });

  describe('when seven pairs', () => {
    const tiles: Tile[] = [
      'man-3', 'man-3',
      'pin-1', 'pin-1',
      'pin-5', 'pin-5r',
      'sou-1', 'sou-1',
      'sou-8', 'sou-8',
      'wind-east', 'wind-east',
      'dragon-green', 'dragon-green',
    ];
    const melds = findMelds(tiles);
    const winState: WinState = { open: false, draw: 'ron', riichi: false };

    it('returns seven pairs with 2 han', () => {
      // @ts-expect-error
      const result = findYaku(tiles, melds, { winState });

      expect(result).toStrictEqual([
        { han: 2, name: 'seven-pairs' },
      ]);
    });
  });

  describe('when tsumo', () => {
    const winState: WinState = { open: false, draw: 'tsumo', riichi: false };

    it('returns tsumo with 1 han', () => {
      // @ts-expect-error
      const result = findYaku([], [], { winState });

      expect(result).toStrictEqual([
        { han: 1, name: 'tsumo' },
      ]);
    });
  });
});