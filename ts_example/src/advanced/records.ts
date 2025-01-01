type Client = {
  name: string;
  age: number;
};

type Keys = keyof Client;
type Values = Client[keyof Client];

const test1 = () => {
  const t: [Values, Values] = [1, '23'];
  console.log(t);
};
// test1();

/*
 * keyof (A & B) = (keyof A) | (keyof B)
 * keyof (A | B) = (keyof A) & (keyof B)
 * */

// type intersections compile slower than 'interface extends' for static type hierarchies
// interfaces are static, cannot be created using type functions

// records

type RecordOfBools = { [key: string]: boolean };
type RecordOfBools2 = Record<string, boolean>; // uses map types {[P in K]: T;}

type Props = { value: string; focuses: boolean; cnt: number };

type PartialProps = Partial<Props>;

type RequiredProps = Required<PartialProps>;

type PickProps = Pick<Props, 'value' | 'cnt'>; // pick subset of object props by name

type OmitProps = Omit<Props, 'value' | 'cnt'>; // omit subset of object props by name

const test2 = () => {};

// tuples

type Empty = [];
type One = [1];
type Two = [1, '2'];
type TwoT = [number, string];

type ATuple = Two[1];
type ATupleOneTwo = Two[0 | 1]; // access multiple tuple type members / fields using type union o indexes
type ATupleAllValues = Two[number]; // access all values by "subset" type

// keyof Tuple includes all methods as well
type TupleKeys = keyof ['Jack', 25];
const mapKey: TupleKeys = 'map';
// so keyof on tuple is not very useful

type Tuple3 = [...Two, ...TwoT];

// tuple values can be named for clarity

type TupleNamed = [name: string, email: string];
type TupleOptional = [string, string?];

// arrays

type Keywords = string[];
type Clients = Array<RecordOfBools>;
type Digits = (0 | 1 | 2)[];

// access element type of array

type ArrayElem = Keywords[number]; // the same "trick" that works with indexing tuple types

// combine arrays and tuples

// number starts with 0
type SomeNumber = [0, ...number[]];
type ANumber = [8 | 9, ...number[]];

// ends with ?
type Quesion = [...string[], '?'];

type NoteEmptyNumber = [number, ...number[]];

const aQuestion: Quesion = ['1', '23434', '?'];

//
type UserTuple = [name: string, age?: number, ...addresses: string[]];

function updateUSer(user: string, ...args: UserTuple) {}

function ensureExhaustive(arg: never) {}

function caseFun(item: 1 | 2) {
  switch (item) {
    case 1:
      return '!';
    case 2:
      return '!!';
    default:
      ensureExhaustive(item);
  }
}

caseFun(1);

// typescript algorithms, typescript type system is touring complete, it supports branching logic

type IsTooOld<T> = T extends 50 ? T : never;

type hmm = IsTooOld<never>;

type ifT<A extends boolean, B, C> = A extends true ? B : C;
type AIf = ifT<true, number, string>;
type BIf = ifT<false, {}, []>;
// type NeverIf = ifT<"not a boolean", number, string>; // compile error
type NeverIf = ifT<never, number, string>; // returns never !!! never extends X ? X: Y always returns never
// const nIf: NeverIf = 5; // Type '5' is not assignable to type 'never'.

const buildUser0 = <S>(name: S) => ({ name }); // creates field name with type string
// to make it work type bound should be used, it makes typescript perform type inference
const buildUser = <S extends string>(name: S) => ({ name });

const user = buildUser('Jack'); // creates field name with literal type "Jack"

// infer tuple (aid compilers inference)

const inferAsTuple = <T extends [unknown, ...unknown[]]>(tuple: T) => tuple;

const t1a = [1, '2'];
const t1 = inferAsTuple([1, '2']);
// [number, string] instead of (number | string)[]

// nested conditions
type GetColor<I> = I extends 0
  ? 'green'
  : I extends 1
    ? 'red'
    : I extends 2
      ? 'blue'
      : 'yellow';
// equivalent
type SetColorI<I extends 0 | 1 | 2 | 3> = {
  0: 'green';
  1: 'red';
  2: 'blue';
  3: 'yellow';
}[I];

// pattern matching and condition types
type Plan = 's' | 'g';
type Role = 'r' | 'w' | 'a';
type CanEdit<P extends Plan, R extends Role> = [P, R] extends [
  's' | 'g',
  'w' | 'a',
]
  ? true
  : false;

type CE1 = CanEdit<'s', 'r'>;
// type signatures must match exactly
const CEv: CE1 = false;

type GetRole<User> = User extends { name: string; role: infer Role }
  ? Role
  : never;

type UR1 = GetRole<{ name: string; role: { value: number } }>;
const UR1v: UR1 = { value: 3 };

// infer can be used in any typescript structure

type Head<Tuple> = Tuple extends [infer First, ...any] ? First : never;
type H1 = Head<[1, 2, 3]>; // 1
type H2 = Head<[]>; // never

type HeadTail<Tuple> = Tuple extends [infer First, ...any, infer Tail]
  ? [First, Tail]
  : [];

type IsEqual = (a: number, b: string) => boolean;

type Params<F> = F extends (...params: infer P) => any ? P : never;
type ReturnType1<F> = F extends (...params: any) => infer P ? P : never; // typescript has similar builtin

type Parmas2 = Params<IsEqual>;

// infer can be used with generics

type MyGeneric<A, B> = { content: A; children: B[] };
type ExtractParmas<S> = S extends MyGeneric<infer A, infer B> ? [A, B] : never;
type MyGenParams1 = ExtractParmas<MyGeneric<number, string>>;

// infer can be used after extends
type HeavyTask<T> = unknown;
type Fn<T> = HeavyTask<T> extends infer Result ? [Result, Result, Result] : never; // store result type of HeavyTask<T> in a variable
