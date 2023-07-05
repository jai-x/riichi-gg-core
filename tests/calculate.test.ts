import { Tile } from '../src/types/tile';
import { calculate } from '../src/calculate';

describe('input validation', () => {
  describe('tile validation', () => {
    test('too few tiles', () => {
      const thirteen: ReadonlyArray<Tile> = Array.from({ length: 13 }, () => 'pin-1');

      // @ts-expect-error
      const result = calculate(thirteen, {});

      expect(result).toStrictEqual({ ok: false, message: 'tiles-too-few' });
    });

    test('too many tiles', () => {
      const nineteen: ReadonlyArray<Tile> = Array.from({ length: 19 }, () => 'pin-1');

      // @ts-expect-error
      const result = calculate(nineteen, {});

      expect(result).toStrictEqual({ ok: false, message: 'tiles-too-many' });
    });
  });
});