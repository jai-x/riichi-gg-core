import { Tile, NumberTile } from './tile';

export type PairTuple = { [T in Tile]: [T, T]       }[Tile]
export type PonTuple  = { [T in Tile]: [T, T, T]    }[Tile]
export type KanTuple  = { [T in Tile]: [T, T, T, T] }[Tile]

type ChiTupleNoDora =
  | readonly ['pin-1', 'pin-2', 'pin-3']
  | readonly ['pin-2', 'pin-3', 'pin-4']
  | readonly ['pin-3', 'pin-4', 'pin-5']
  | readonly ['pin-4', 'pin-5', 'pin-6']
  | readonly ['pin-5', 'pin-6', 'pin-7']
  | readonly ['pin-6', 'pin-7', 'pin-8']
  | readonly ['pin-7', 'pin-8', 'pin-9']
  | readonly ['sou-1', 'sou-2', 'sou-3']
  | readonly ['sou-2', 'sou-3', 'sou-4']
  | readonly ['sou-3', 'sou-4', 'sou-5']
  | readonly ['sou-4', 'sou-5', 'sou-6']
  | readonly ['sou-5', 'sou-6', 'sou-7']
  | readonly ['sou-6', 'sou-7', 'sou-8']
  | readonly ['sou-7', 'sou-8', 'sou-9']
  | readonly ['man-1', 'man-2', 'man-3']
  | readonly ['man-2', 'man-3', 'man-4']
  | readonly ['man-3', 'man-4', 'man-5']
  | readonly ['man-4', 'man-5', 'man-6']
  | readonly ['man-5', 'man-6', 'man-7']
  | readonly ['man-6', 'man-7', 'man-8']
  | readonly ['man-7', 'man-8', 'man-9'];

type ChiTupleWithDora =
  | readonly ['pin-3' , 'pin-4' , 'pin-5r']
  | readonly ['pin-4' , 'pin-5r', 'pin-6' ]
  | readonly ['pin-5r', 'pin-6' , 'pin-7' ]
  | readonly ['sou-3' , 'sou-4' , 'sou-5r']
  | readonly ['sou-4' , 'sou-5r', 'sou-6' ]
  | readonly ['sou-5r', 'sou-6' , 'sou-7' ]
  | readonly ['man-3' , 'man-4' , 'man-5r']
  | readonly ['man-4' , 'man-5r', 'man-6' ]
  | readonly ['man-5r', 'man-6' , 'man-7' ];

export type ChiTuple = ChiTupleNoDora | ChiTupleWithDora;

export type Pair = { kind: 'pair', value: PairTuple }
export type Chi =  { kind: 'chi', value: ChiTuple }
export type Pon =  { kind: 'pon', value: PonTuple }
export type Kan =  { kind: 'kan', value: KanTuple }

export type Meld = Pair | Pon | Chi | Kan;

const chiMap: Record<NumberTile, ReadonlyArray<ChiTuple>> = {
  'pin-1': [
    ['pin-1', 'pin-2', 'pin-3'],
  ],
  'pin-2': [
    ['pin-1', 'pin-2', 'pin-3'],
    ['pin-2', 'pin-3', 'pin-4'],
  ],
  'pin-3': [
    ['pin-1', 'pin-2', 'pin-3'],
    ['pin-2', 'pin-3', 'pin-4'],
    ['pin-3', 'pin-4', 'pin-5'],
    ['pin-3', 'pin-4', 'pin-5r'],
  ],
  'pin-4': [
    ['pin-2', 'pin-3', 'pin-4'],
    ['pin-3', 'pin-4', 'pin-5'],
    ['pin-3', 'pin-4', 'pin-5r'],
    ['pin-4', 'pin-5', 'pin-6'],
    ['pin-4', 'pin-5r', 'pin-6'],
  ],
  'pin-5': [
    ['pin-3', 'pin-4', 'pin-5'],
    ['pin-4', 'pin-5', 'pin-6'],
    ['pin-5', 'pin-6', 'pin-7'],
  ],
  'pin-5r': [
    ['pin-3', 'pin-4', 'pin-5r'],
    ['pin-4', 'pin-5r', 'pin-6'],
    ['pin-5r', 'pin-6', 'pin-7'],
  ],
  'pin-6': [
    ['pin-4', 'pin-5', 'pin-6'],
    ['pin-4', 'pin-5r', 'pin-6'],
    ['pin-5', 'pin-6', 'pin-7'],
    ['pin-5r', 'pin-6', 'pin-7'],
    ['pin-6', 'pin-7', 'pin-8'],
  ],
  'pin-7': [
    ['pin-5', 'pin-6', 'pin-7'],
    ['pin-5r', 'pin-6', 'pin-7'],
    ['pin-6', 'pin-7', 'pin-8'],
    ['pin-7', 'pin-8', 'pin-9'],
  ],
  'pin-8': [
    ['pin-6', 'pin-7', 'pin-8'],
    ['pin-7', 'pin-8', 'pin-9'],
  ],
  'pin-9': [
    ['pin-7', 'pin-8', 'pin-9'],
  ],
  'sou-1': [
    ['sou-1', 'sou-2', 'sou-3'],
  ],
  'sou-2': [
    ['sou-1', 'sou-2', 'sou-3'],
    ['sou-2', 'sou-3', 'sou-4'],
  ],
  'sou-3': [
    ['sou-1', 'sou-2', 'sou-3'],
    ['sou-2', 'sou-3', 'sou-4'],
    ['sou-3', 'sou-4', 'sou-5'],
    ['sou-3', 'sou-4', 'sou-5r'],
  ],
  'sou-4': [
    ['sou-2', 'sou-3', 'sou-4'],
    ['sou-3', 'sou-4', 'sou-5'],
    ['sou-3', 'sou-4', 'sou-5r'],
    ['sou-4', 'sou-5', 'sou-6'],
    ['sou-4', 'sou-5r', 'sou-6'],
  ],
  'sou-5': [
    ['sou-3', 'sou-4', 'sou-5'],
    ['sou-4', 'sou-5', 'sou-6'],
    ['sou-5', 'sou-6', 'sou-7'],
  ],
  'sou-5r': [
    ['sou-3', 'sou-4', 'sou-5r'],
    ['sou-4', 'sou-5r', 'sou-6'],
    ['sou-5r', 'sou-6', 'sou-7'],
  ],
  'sou-6': [
    ['sou-4', 'sou-5', 'sou-6'],
    ['sou-4', 'sou-5r', 'sou-6'],
    ['sou-5', 'sou-6', 'sou-7'],
    ['sou-5r', 'sou-6', 'sou-7'],
    ['sou-6', 'sou-7', 'sou-8'],
  ],
  'sou-7': [
    ['sou-5', 'sou-6', 'sou-7'],
    ['sou-5r', 'sou-6', 'sou-7'],
    ['sou-6', 'sou-7', 'sou-8'],
    ['sou-7', 'sou-8', 'sou-9'],
  ],
  'sou-8': [
    ['sou-6', 'sou-7', 'sou-8'],
    ['sou-7', 'sou-8', 'sou-9'],
  ],
  'sou-9': [
    ['sou-7', 'sou-8', 'sou-9'],
  ],
  'man-1': [
    ['man-1', 'man-2', 'man-3'],
  ],
  'man-2': [
    ['man-1', 'man-2', 'man-3'],
    ['man-2', 'man-3', 'man-4'],
  ],
  'man-3': [
    ['man-1', 'man-2', 'man-3'],
    ['man-2', 'man-3', 'man-4'],
    ['man-3', 'man-4', 'man-5'],
    ['man-3', 'man-4', 'man-5r'],
  ],
  'man-4': [
    ['man-2', 'man-3', 'man-4'],
    ['man-3', 'man-4', 'man-5'],
    ['man-3', 'man-4', 'man-5r'],
    ['man-4', 'man-5', 'man-6'],
    ['man-4', 'man-5r', 'man-6'],
  ],
  'man-5': [
    ['man-3', 'man-4', 'man-5'],
    ['man-4', 'man-5', 'man-6'],
    ['man-5', 'man-6', 'man-7'],
  ],
  'man-5r': [
    ['man-3', 'man-4', 'man-5r'],
    ['man-4', 'man-5r', 'man-6'],
    ['man-5r', 'man-6', 'man-7'],
  ],
  'man-6': [
    ['man-4', 'man-5', 'man-6'],
    ['man-4', 'man-5r', 'man-6'],
    ['man-5', 'man-6', 'man-7'],
    ['man-5r', 'man-6', 'man-7'],
    ['man-6', 'man-7', 'man-8'],
  ],
  'man-7': [
    ['man-5', 'man-6', 'man-7'],
    ['man-5r', 'man-6', 'man-7'],
    ['man-6', 'man-7', 'man-8'],
    ['man-7', 'man-8', 'man-9'],
  ],
  'man-8': [
    ['man-6', 'man-7', 'man-8'],
    ['man-7', 'man-8', 'man-9'],
  ],
  'man-9': [
    ['man-7', 'man-8', 'man-9'],
  ],
} as const;

export const chiForNumber = (num: NumberTile): ReadonlyArray<Chi> =>
  chiMap[num].map(t => ({ kind: 'chi', value: t}) as Chi);
