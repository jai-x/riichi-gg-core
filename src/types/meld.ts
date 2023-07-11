import { Tile, NumberTile, Five }  from './tile';

// Types declared in this form are indexed distrubted types.
// See explanation here: https://stackoverflow.com/questions/76561056
// type Foos = { [T in Foo]: [T, T, ...] }[Foo];

type PairTupleNoDora = { [T in Tile]: [T, T] }[Tile];

type PairTupleWithDora =
  | readonly ['pin-5r', 'pin-5']
  | readonly ['pin-5', 'pin-5r']
  | readonly ['sou-5r', 'sou-5']
  | readonly ['sou-5', 'sou-5r']
  | readonly ['man-5r', 'man-5']
  | readonly ['man-5', 'man-5r'];

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

type PonTupleNoDora = { [T in Tile]: [T, T, T] }[Tile];

type PonTupleWithDora =
  | readonly ['pin-5r', 'pin-5', 'pin-5']
  | readonly ['pin-5', 'pin-5r', 'pin-5']
  | readonly ['pin-5', 'pin-5', 'pin-5r']
  | readonly ['sou-5r', 'sou-5', 'sou-5']
  | readonly ['sou-5', 'sou-5r', 'sou-5']
  | readonly ['sou-5', 'sou-5', 'sou-5r']
  | readonly ['man-5r', 'man-5', 'man-5']
  | readonly ['man-5', 'man-5r', 'man-5']
  | readonly ['man-5', 'man-5', 'man-5r'];

type KanTupleNoDora = { [T in Tile]: [T, T, T, T] }[Tile];

type KanTupleWithDora =
  | readonly ['pin-5r', 'pin-5', 'pin-5', 'pin-5']
  | readonly ['pin-5', 'pin-5r', 'pin-5', 'pin-5']
  | readonly ['pin-5', 'pin-5r', 'pin-5r', 'pin-5']
  | readonly ['pin-5', 'pin-5r', 'pin-5r', 'pin-5r']
  | readonly ['sou-5r', 'sou-5', 'sou-5', 'sou-5']
  | readonly ['sou-5', 'sou-5r', 'sou-5', 'sou-5']
  | readonly ['sou-5', 'sou-5r', 'sou-5r', 'sou-5']
  | readonly ['sou-5', 'sou-5r', 'sou-5r', 'sou-5r']
  | readonly ['man-5r', 'man-5', 'man-5', 'man-5']
  | readonly ['man-5', 'man-5r', 'man-5', 'man-5']
  | readonly ['man-5', 'man-5r', 'man-5r', 'man-5']
  | readonly ['man-5', 'man-5r', 'man-5r', 'man-5r'];

export type ChiTuple = ChiTupleNoDora | ChiTupleWithDora;
export type PairTuple = PairTupleNoDora | PairTupleWithDora;
export type PonTuple = PonTupleNoDora | PonTupleWithDora;
export type KanTuple = KanTupleNoDora | KanTupleWithDora;

export type Pair = { kind: 'pair', value: PairTuple };
export type Chi = { kind: 'chi', value: ChiTuple };
export type Pon = { kind: 'pon', value: PonTuple };
export type Kan = { kind: 'kan', value: KanTuple };

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

export const chiForNumber = (num: NumberTile): ReadonlyArray<Chi> => {
  return chiMap[num].map(t => ({ kind: 'chi', value: t}) as Chi);
};

// TODO: Find out why this needs explicit casting?
const pairMap: Record<Five, ReadonlyArray<PairTuple>> = {
  'pin-5': [
    ['pin-5', 'pin-5'],
    ['pin-5r', 'pin-5'],
    ['pin-5', 'pin-5r'],
    ['pin-5r', 'pin-5r'],
  ] as ReadonlyArray<PairTuple>,
  'sou-5': [
    ['sou-5', 'sou-5'],
    ['sou-5r', 'sou-5'],
    ['sou-5', 'sou-5r'],
    ['sou-5r', 'sou-5r'],
  ] as ReadonlyArray<PairTuple>,
  'man-5': [
    ['man-5', 'man-5'],
    ['man-5r', 'man-5'],
    ['man-5', 'man-5r'],
    ['man-5r', 'man-5r'],
  ] as ReadonlyArray<PairTuple>,
} as const;

export const pairForTile = (tile: Tile): ReadonlyArray<Pair> => {
  switch (tile) {
    case 'pin-5':
    case 'pin-5r':
      return pairMap['pin-5'].map(t => ({ kind: 'pair', value: t}) as Pair);
    case 'sou-5':
    case 'sou-5r':
      return pairMap['sou-5'].map(t => ({ kind: 'pair', value: t}) as Pair);
    case 'man-5':
    case 'man-5r':
      return pairMap['man-5'].map(t => ({ kind: 'pair', value: t}) as Pair);
    default:
      return [{ kind: 'pair', value: [tile, tile]} as Pair];
  }
};

// TODO: Find out why this needs explicit casting?
const ponMap: Record<Five, ReadonlyArray<PonTuple>> = {
  'pin-5': [
    ['pin-5', 'pin-5', 'pin-5'],
    ['pin-5r', 'pin-5', 'pin-5'],
    ['pin-5', 'pin-5r', 'pin-5'],
    ['pin-5', 'pin-5', 'pin-5r'],
  ] as ReadonlyArray<PonTuple>,
  'sou-5': [
    ['sou-5', 'sou-5', 'sou-5'],
    ['sou-5r', 'sou-5', 'sou-5'],
    ['sou-5', 'sou-5r', 'sou-5'],
    ['sou-5', 'sou-5', 'sou-5r'],
  ] as ReadonlyArray<PonTuple>,
  'man-5': [
    ['man-5', 'man-5', 'man-5'],
    ['man-5r', 'man-5', 'man-5'],
    ['man-5', 'man-5r', 'man-5'],
    ['man-5', 'man-5', 'man-5r'],
  ] as ReadonlyArray<PonTuple>,
} as const;

export const ponForTile = (tile: Tile): ReadonlyArray<Pon> => {
  switch (tile) {
    case 'pin-5':
    case 'pin-5r':
      return ponMap['pin-5'].map(t => ({ kind: 'pon', value: t}) as Pon);
    case 'sou-5':
    case 'sou-5r':
      return ponMap['sou-5'].map(t => ({ kind: 'pon', value: t}) as Pon);
    case 'man-5':
    case 'man-5r':
      return ponMap['man-5'].map(t => ({ kind: 'pon', value: t}) as Pon);
    default:
      return [{ kind: 'pon', value: [tile, tile, tile] } as Pon];
  }
};

// TODO: Find out why this needs explicit casting?
const kanMap: Record<Five, ReadonlyArray<KanTuple>> = {
  'pin-5': [
    ['pin-5', 'pin-5', 'pin-5', 'pin-5'],
    ['pin-5r', 'pin-5', 'pin-5', 'pin-5'],
    ['pin-5', 'pin-5r', 'pin-5', 'pin-5'],
    ['pin-5', 'pin-5', 'pin-5r', 'pin-5'],
    ['pin-5', 'pin-5', 'pin-5', 'pin-5r'],
  ] as ReadonlyArray<KanTuple>,
  'sou-5': [
    ['sou-5', 'sou-5', 'sou-5', 'sou-5'],
    ['sou-5r', 'sou-5', 'sou-5', 'sou-5'],
    ['sou-5', 'sou-5r', 'sou-5', 'sou-5'],
    ['sou-5', 'sou-5', 'sou-5r', 'sou-5'],
    ['sou-5', 'sou-5', 'sou-5', 'sou-5r'],
  ] as ReadonlyArray<KanTuple>,
  'man-5': [
    ['man-5', 'man-5', 'man-5', 'man-5'],
    ['man-5r', 'man-5', 'man-5', 'man-5'],
    ['man-5', 'man-5r', 'man-5', 'man-5'],
    ['man-5', 'man-5', 'man-5r', 'man-5'],
    ['man-5', 'man-5', 'man-5', 'man-5r'],
  ] as ReadonlyArray<KanTuple>,
} as const;

export const kanForTile = (tile: Tile): ReadonlyArray<Kan> => {
  switch (tile) {
    case 'pin-5':
    case 'pin-5r':
      return kanMap['pin-5'].map(t => ({ kind: 'kan', value: t}) as Kan);
    case 'sou-5':
    case 'sou-5r':
      return kanMap['sou-5'].map(t => ({ kind: 'kan', value: t}) as Kan);
    case 'man-5':
    case 'man-5r':
      return kanMap['man-5'].map(t => ({ kind: 'kan', value: t}) as Kan);
    default:
      return [{ kind: 'kan', value: [tile, tile, tile, tile] } as Kan];
  }
};
