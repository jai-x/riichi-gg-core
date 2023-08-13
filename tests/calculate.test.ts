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

    test('not tiles', () => {
      const notTiles = Array.from({ length: 15 }, () => 'foo-1');

      // @ts-expect-error
      const result = calculate(notTiles, {});

      expect(result).toStrictEqual({ ok: false, message: 'tiles-invalid' });
    });

    test('invalid hand', () => {
      const badHand: ReadonlyArray<Tile> = Array.from({ length: 14 }, () => 'pin-1');

      // @ts-expect-error
      const result = calculate(badHand, {});

      expect(result).toStrictEqual({ ok: false, message: 'tiles-invalid' });
    });
  });

  describe('param validation', () => {
    test.todo('param validation tests');
  });
});

describe('results', () => {
  test.todo('yakuman hand');

  test.todo('normal hand with han');
});