import { InitCommand } from 'typeorm/commands/InitCommand';

type Col = {
  name: string;
  values: unknown[];
};

type Table = [Col, ...Col[]];

type ClientTable = [
  { name: 'username'; values: string[] },
  { name: 'country'; values: number[] },
  { name: 'plan'; values: boolean[] },
];

declare function extractColumn<T extends Table, N extends string>(
  table: T,
  columnName: N,
): ExtractColumn<T, N>;

type AnyT<T, P> = T extends P ? T : never;

type ExtractColumn<List, Name> = List extends [infer H, ...infer T]
  ? Name extends AnyT<H[keyof H], Name>
    ? H
    : ExtractColumn<T, Name>
  : never;

type extracted = ExtractColumn<ClientTable, 'plan'>;

type ClientColumn<T, Name> = Name extends AnyT<T[keyof T], Name> ? Name : never; //extends Name ? true : false;

type clientCol = ClientColumn<ClientTable[1], 'country'>;

// or use pattern matching

type ExtractColumnVals<List, Name> = List extends [infer H, ...infer T]
  ? H extends { name: Name; values: infer V }
    ? V
    : ExtractColumn<T, Name>
  : never;

// mapping

type Names = ToNames<
  [{ id: 1; name: 'Jack' }, { id: 1; name: 'Rose' }],
  'name',
  NameItem
>;

const NamesVa: Names = [{ name: 'Jack' }, { name: 'Rose' }];

type NameItem = { id: number; name: string };

type ToNames<List, FieldName extends keyof U, U> = List extends [
  infer H extends U,
  ...infer T extends U[],
]
  ? [Pick<H, FieldName>, ...ToNames<T, FieldName, U>]
  : [];

type Numbers = OnlyNumbers<[1, 2, 'hey', 3, 'bye'], string>;

type OnlyNumbers<List, Target> = List extends [infer H, ...infer T]
  ? H extends Target
    ? [H, ...OnlyNumbers<T, Target>]
    : [...OnlyNumbers<T, Target>]
  : [];

// reducing

type Op<L, R> = L & R; // does not work

type Reduce<List, E> = List extends [infer H, ...infer T]
  ? H | Reduce<T, E> // not tail recursive - bad
  : E;

type Reduced = Reduce<
  [{ id: number; name: string }, { id: number; name: string }],
  { name: string }
>;

const reducedVal: Reduced = { id: 1, name: 'abc' };

// 2nd reduce
type Client = ExtractProps<[['name' | 'firstName', 'JAck'], ['id', 123]]>;

type ExtractProps<Entries, Acc = {}> = Entries extends [infer H, ...infer T]
  ? ExtractProps< // tail recursive - good, typescript performs optimizations
      T,
      H extends [infer Key extends string, infer Value]
        ? Acc & { [K in Key]: Value }
        : Acc
    >
  : Acc;
