// Constants
export const pinTiles = [
  'pin-1',
  'pin-2',
  'pin-3',
  'pin-4',
  'pin-5',
  'pin-5r',
  'pin-6',
  'pin-7',
  'pin-8',
  'pin-9',
] as const;

export const souTiles = [
  'sou-1',
  'sou-2',
  'sou-3',
  'sou-4',
  'sou-5',
  'sou-5r',
  'sou-6',
  'sou-7',
  'sou-8',
  'sou-9',
] as const;

export const manTiles = [
  'man-1',
  'man-2',
  'man-3',
  'man-4',
  'man-5',
  'man-5r',
  'man-6',
  'man-7',
  'man-8',
  'man-9',
] as const;

export const numberTiles = [
  ...pinTiles,
  ...souTiles,
  ...manTiles,
] as const;

export const terminalTiles = [
  pinTiles[0],
  pinTiles[9],
  souTiles[0],
  souTiles[9],
  manTiles[0],
  manTiles[9],
] as const;

export const dragonTiles = [
  'dragon-white',
  'dragon-green',
  'dragon-red',
] as const;

export const windTiles = [
  'wind-east',
  'wind-south',
  'wind-west',
  'wind-north',
] as const;

export const honourTiles = [
  ...dragonTiles,
  ...windTiles,
] as const;

export const allTiles = [
  ...numberTiles,
  ...honourTiles,
] as const;

// Derived types
export type PinTile      = typeof pinTiles[number];
export type SouTile      = typeof souTiles[number];
export type ManTile      = typeof manTiles[number];
export type NumberTile   = PinTile | SouTile | ManTile;

export type TerminalTile = typeof terminalTiles[number];
export type SimpleTile   = Exclude<NumberTile, TerminalTile>;

export type DragonTile   = typeof dragonTiles[number];
export type WindTile     = typeof windTiles[number];
export type HonourTile   = WindTile | DragonTile;

export type Tile         = NumberTile | HonourTile;

// Helper functions
export const isPin      = (tile: Tile): boolean => pinTiles.includes(tile as PinTile);
export const isSou      = (tile: Tile): boolean => souTiles.includes(tile as SouTile);
export const isMan      = (tile: Tile): boolean => manTiles.includes(tile as ManTile);
export const isNumber   = (tile: Tile): boolean => numberTiles.includes(tile as NumberTile);
export const isTerminal = (tile: Tile): boolean => terminalTiles.includes(tile as TerminalTile);
export const isSimple   = (tile: Tile): boolean => !isTerminal(tile);
export const isWind     = (tile: Tile): boolean => windTiles.includes(tile as WindTile);
export const isDragon   = (tile: Tile): boolean => dragonTiles.includes(tile as DragonTile);
export const isHonour   = (tile: Tile): boolean => honourTiles.includes(tile as HonourTile);
