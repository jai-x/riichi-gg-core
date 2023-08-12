import * as R from 'ramda';

import { NumberTile, Tile, isNumber } from './types/tile';
import { Meld, kanForTile, ponForTile, pairForTile, chiForNumber, Kan, Pair, Pon, Chi } from './types/meld';
import { isThirteenOrphansTiles } from './helpers';

class MeldSearchNodeQueue {
  #queue: MeldSearchNode[];

  constructor() {
    this.#queue = [];
  }

  add(node: MeldSearchNode) {
    this.#queue.push(node);
  }

  remove(): MeldSearchNode | null {
    if (this.#queue.length === 0) {
      return null;
    }
    const node = this.#queue[0];
    this.#queue = this.#queue.slice(1)
    return node;
  }

  contains(node: MeldSearchNode): boolean {
    return this.#queue.some((queueNode) => meldsCmp(queueNode.foundMelds, node.foundMelds));
  }
}

type MeldSearchNode = {
  parent: MeldSearchNode | null;
  foundMelds: Meld[];
  remainingTiles: ReadonlyArray<Tile>;
};

const meldKey = (meld: Meld): string => `${meld.kind}-${meld.value.join('-')}`;

const meldsCmp = (a: ReadonlyArray<Meld>, b: ReadonlyArray<Meld>): boolean => {
  const aMelds = a.map((m) => meldKey(m)).sort();
  const bMelds = b.map((m) => meldKey(m)).sort();
  return R.equals(aMelds, bMelds);
}

// Find the melds within the given set of tiles
// General strategy:
// * Breadth first search of all possible hand permuations
// * Order: [pair, kan, pon, chi]
// * Don't re-explore nodes that already have been explored with the same melds
// * When a node has no more remaining tiles, it's considered a winning hand
export const findMelds = (tiles: ReadonlyArray<Tile>): ReadonlyArray<Meld> => {  
  const candidateMelds = findCandidateMelds(tiles);
  // Thirteen orphans only has one meld (the pair)
  if (isThirteenOrphansTiles(tiles) && candidateMelds.length === 1) {
    return candidateMelds;
  }

  const winningMelds: Meld[][] = [];
  const queue = new MeldSearchNodeQueue();

  const root: MeldSearchNode = {
    parent: null,
    foundMelds: [],
    remainingTiles: tiles,
  };

  queue.add(root);

  while (true) {
    const currentNode = queue.remove()

    if (!currentNode) {
      break;
    }

    if (currentNode.remainingTiles.length === 0) {
      winningMelds.push(currentNode.foundMelds);
    }

    const pairs = findPairs(currentNode.remainingTiles);
    for (const pair of pairs) {
      const newNode: MeldSearchNode = {
        parent: currentNode,
        foundMelds: currentNode.foundMelds.concat([pair]),
        remainingTiles: removeMeldTiles(currentNode.remainingTiles, pair),
      };
      if (!queue.contains(newNode)) {
        queue.add(newNode);
      }
    }

    const kans = findKans(currentNode.remainingTiles);
    for (const kan of kans) {
      const newNode: MeldSearchNode = {
        parent: currentNode,
        foundMelds: currentNode.foundMelds.concat([kan]),
        remainingTiles: removeMeldTiles(currentNode.remainingTiles, kan),
      };
      if (!queue.contains(newNode)) {
        queue.add(newNode);
      }
    }

    const pons = findPons(currentNode.remainingTiles);
    for (const pon of pons) {
      const newNode: MeldSearchNode = {
        parent: currentNode,
        foundMelds: currentNode.foundMelds.concat([pon]),
        remainingTiles: removeMeldTiles(currentNode.remainingTiles, pon),
      };
      if (!queue.contains(newNode)) {
        queue.add(newNode);
      }
    }

    const chis = findChis(currentNode.remainingTiles);
    for (const chi of chis) {
      const newNode: MeldSearchNode = {
        parent: currentNode,
        foundMelds: currentNode.foundMelds.concat([chi]),
        remainingTiles: removeMeldTiles(currentNode.remainingTiles, chi),
      };
      if (!queue.contains(newNode)) {
        queue.add(newNode);
      }
    }
  }

  if (winningMelds.length === 0) {
    throw Error('Weird hand');
  }

  if (winningMelds.length === 1) {
    return winningMelds[0];
  }

  const uniqMelds = R.uniqWith(meldsCmp, winningMelds);

  return uniqMelds[0];
};

const findChis = (tiles: ReadonlyArray<Tile>): ReadonlyArray<Chi> =>
  R.pipe(
    R.filter((tile: Tile) => isNumber(tile)),
    R.map((tile: Tile) => chiForNumber(tile as NumberTile)),
    R.unnest,
    R.filter((chi: Chi) => Array.from(chi.value).every(tile => tiles.includes(tile))),
    R.uniq,
  )(tiles);

const findPairs = (tiles: ReadonlyArray<Tile>): ReadonlyArray<Pair> =>
  R.pipe(
    (tiles) => tileDuplicates(tiles, 2),
    R.map(pairForTile),
    R.unnest,
  )(tiles);

const findPons = (tiles: ReadonlyArray<Tile>): ReadonlyArray<Pon> =>
  R.pipe(
    (tiles) => tileDuplicates(tiles, 3),
    R.map(ponForTile),
    R.unnest,
  )(tiles);

const findKans = (tiles: ReadonlyArray<Tile>): ReadonlyArray<Kan> =>
  R.pipe(
    (tiles) => tileDuplicates(tiles, 4),
    R.map(kanForTile),
    R.unnest,
  )(tiles);

const tileDuplicates = (tiles: ReadonlyArray<Tile>, min: number): ReadonlyArray<Tile> =>
  R.pipe(
    R.map((tile: Tile) => deDora(tile)),
    R.countBy((tile) => String(tile)),
    R.filter((count: number) => count >= min),
    R.keys,
    R.map((key: string) => key as Tile),
  )(tiles);

const deDora = (tile: Tile): Tile => {
  const doraMap: Map<Tile, Tile> = new Map([
    ['pin-5r', 'pin-5'],
    ['sou-5r', 'sou-5'],
    ['man-5r', 'man-5'],
  ]);
  return doraMap.get(tile) || tile;
}

export const removeMeldTiles = (tiles: ReadonlyArray<Tile>, meld: Meld): ReadonlyArray<Tile> => {
  const removeIndexes: Set<number> = new Set();

  for (const tile of meld.value) {
    const idx = tiles.findIndex((t, i) => tile === t && !removeIndexes.has(i));

    if (idx > -1) {
      removeIndexes.add(idx);
    }
  }

  return tiles.filter((_, i) => !removeIndexes.has(i));
}


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