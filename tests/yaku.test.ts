import { WinState } from "../src/calculate";
import { findMelds } from "../src/melds";
import { Tile } from "../src/types/tile";
import { findYaku } from "../src/yaku";

describe('findYaku', () => {
  describe('when riichi', () => {
    it('returns riichi with 1 han', () => {
      const winState: WinState = { open: false, draw: 'tsumo', riichi: true, ippatsu: false }

      // @ts-expect-error
      const result = findYaku(null, null, { winState });

      expect(result).toStrictEqual([
        { han: 1, name: 'riichi' },
      ]);
    });
  });

  describe('when riichi ippatsu', () => {
    it('returns riichi and ippatsu with 1 han', () => {
      const winState: WinState = { open: false, draw: 'tsumo', riichi: true, ippatsu: true }

      // @ts-expect-error
      const result = findYaku(null, null, { winState });

      expect(result).toStrictEqual([
        { han: 1, name: 'riichi' },
        { han: 1, name: 'ippatsu' },
      ]);
    });
  });
});