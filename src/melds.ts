import { NumberTile, Tile, isNumber } from './types/tile';
import { Meld, kanForTile, ponForTile, pairForTile, chiForNumber } from './types/meld';

// Find the melds within the given set of tiles
// General strategy:
// * For each tile, enumerate all the possbile melds the tile can appear in
// * Remove melds that are not possible to make with the given tiles
// * Deduplicate the candidate melds
// * Sort melds in order of binding priority ['kan' > 'pon' > 'pair' >'chi'];
// * For each meld in the given order:
//   * Find a meld that can fit in the given tiles
//   * Exclude these tiles from then next search
export const findMelds = (tiles: ReadonlyArray<Tile>): ReadonlyArray<Meld> => {
  const candidateMelds = findCandidateMelds(tiles);
  const candidateMeldsSorted = sortCandidateMelds(candidateMelds);
  return findValidMelds(candidateMeldsSorted, tiles);
};

const findValidMelds = (melds: ReadonlyArray<Meld>, tiles: ReadonlyArray<Tile>): ReadonlyArray<Meld> => {
  const exclude: Set<number> = new Set();

  return melds.filter((testMeld) => {
    const [canFit, meldIndexes] = isSubset(tiles, testMeld.value, exclude);

    if (canFit) {
      meldIndexes.forEach(idx => exclude.add(idx));
    }

    return canFit;
  });
};

type SubsetResult = [true, Set<number>] | [false, null];

const isSubset = <T>(parent: ReadonlyArray<T>, child: ReadonlyArray<T>, exclude: Set<number> = new Set()): SubsetResult => {
  let foundIndexes: Set<number> = new Set();

  for (const value of child) {
    const idx = parent.findIndex((v, i) =>
      v === value && !foundIndexes.has(i) && !exclude.has(i)
    );

    if (idx < 0) {
      return [false, null];
    }

    foundIndexes.add(idx);
  };

  return [true, foundIndexes];
};

const sortCandidateMelds = (melds: ReadonlyArray<Meld>): ReadonlyArray<Meld> => {
  // Sort by priority of how each meld is checked for
  const meldPriority = ['kan', 'pon', 'pair', 'chi'];
  return [...melds].sort((a, b) => {
    return meldPriority.indexOf(a.kind) - meldPriority.indexOf(b.kind);
  });
};

const findCandidateMelds = (tiles: ReadonlyArray<Tile>): ReadonlyArray<Meld> => {
  let candidateMeldSet: Map<string, Meld> = new Map();

  for (const tile of tiles) {
    const tileMelds: Array<Meld> = [];

    // Generate [chi, kan, pon, pair] Meld for the given tile
    if (isNumber(tile)) {
      tileMelds.push(...chiForNumber(tile as NumberTile));
    }
    tileMelds.push(...kanForTile(tile));
    tileMelds.push(...ponForTile(tile));
    tileMelds.push(...pairForTile(tile));

    // Filter by melds that are actually possible for the given hand
    const validMelds = tileMelds.filter(c => isValidMeld(c, tiles));

    // Deduplicate
    for (const c of validMelds) {
      // Have to add to hash with stringified value as key since JS can't have a Set with non-literal value ;_;
      candidateMeldSet.set(c.value.join(), c);
    }
  }  

  return Array.from(candidateMeldSet.values());
};

const isValidMeld = (meld: Meld, tiles: ReadonlyArray<Tile>): boolean => {
  let excludeIndexes: Set<number> = new Set()

  for (const tile of meld.value) {
    const idx = tiles.findIndex((t, i) => t === tile && !excludeIndexes.has(i));

    if (idx < 0) {
      return false;
    }

    excludeIndexes.add(idx);
  }

  return true;
};