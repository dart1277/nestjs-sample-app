import { isNumberObject } from 'node:util/types';

let message: string = 'Hello world';
message += ' ok';
console.log(message);

let rx = new RegExp('a+b');
let arr = [1, 2, 3];
let se = new Set([1, 2, 3, 3]);
const arr2 = 'sdf sdf'.match(/sd(f)/g);
const arr3 = /s((d)f)/g.exec('sdf sdf');
console.log(arr3?.slice(0, 3));
let arr4: number[] = [12, 3, 4];

let tpl: [number, string] = [0, '3'];

type Point = { readonly x: string; y: number };

let ctr: Point = {
  x: '12323',
  y: 1,
};

// object has property check - can be used for type inference

if ('x' in ctr) {
  console.log(ctr.x);
}

// literal types
type lit1 = 'a' | 'b' | 'c';

const casef = (li: lit1) => {
  switch (li) {
    case 'a':
      break;
    case 'b':
      break;
    case 'c':
      break;
    default:
      throw Error();
  }
};

casef('a');

// discriminated unions

type A1 = {
  kind: 'a1'; // true | false
  x: string;
};

type A2 = {
  kind: 'a2';
  y: string;
};

type A12 = A1 | A2;

export const fa12 = (v: A12): void => {
  if (v.kind === 'a1') {
  } else if (v.kind === 'a2') {
  } else throw Error('none');
};

class HttpErr extends Error {
  constructor() {
    super();
  }
}

// varagrs
function sum(...values: number[]) {}

type Add = (a: number, b: number) => number;

// structural typing

// additional fields are ok, and can be sliced down

class Animal {
  //private name: string;

  constructor(private name: string) {}
}

class Queue<T> implements Iterable<T> {
  private queue: T[];
  //constructor(...args: T[]);
  //constructor(args: T[]);
  constructor(args?: Iterable<T>) {
    this.queue = !!args ? [...args] : [];
  }

  push(item: T): Queue<T> {
    this.queue.push(item);
    return this;
  }

  pop(): T | null {
    return this.queue.shift() || null;
  }

  size(): number {
    return this.queue.length;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let i = 0;
    while (i < this.queue.length) {
      yield this.queue[i];
      ++i;
    }
  }
}

const q = new Queue<number>();

q.push(1).push(5).push(6);

for (const item of q) {
  console.log(item);
}

interface Comparable<in T> {
  compareTo(b: T): number;
}

class Animals implements Comparable<Animals> {
  private readonly _order: number;

  get order(): number {
    return this._order;
  }

  constructor(order: number) {
    this._order = order;
  }

  compareTo(b: Animals): number {
    console.log('Animal-', this, b);
    return this.order - b.order;
  }
}

class Dog extends Animals {
  constructor(order: number) {
    super(order);
  }

  compareTo(b: Animals): number {
    console.log('Dog-', this, b);
    return this.order - b.order;
  }
}

let animals = new Animals(1);
let dog = new Dog(2);
console.log(dog.compareTo(animals));
console.log(animals.compareTo(dog));

let xxx: unknown = '123';
if (typeof xxx === 'string') {
  let yyy: string = xxx;
  console.log('To string ', yyy);
}

let zzz: number = xxx as number; // no type casting happens !!!
console.log('To string ', zzz);

// requires node specific definitions from *.d.ts files
console.log(process.env.VAR1);

// type unions

type Point2D = {
  x: number;
  y: number;
};

type Point3dD = Point2D & { z?: number; w?: { [name: string]: Animal } }; // map key can only be string or a number, since these are the only types supported by javascript

const fz1 = (z: number) => {};

const p3d: Point3dD = { x: 1, y: 2 };

fz1(p3d.z!);

// typescript supports interface declaration merging (like for namespaces)
// type aliases dont support declaration merging

export interface Req {
  body: string;
}

export interface Req {
  json: string;
}

const req1: Req = { json: '{}', body: '' };

// never can be used as assertion

function isA1(v: A12): v is A1 {
  // note special type hint syntax
  return v.kind === 'a1' && 'kind' in v; // kind in v is always true
}

const neverAssertionFun = (v: A12): string => {
  if (isA1(v)) {
    return v.kind;
  }
  if (v.kind === 'a2') {
    return v.kind;
  }

  const _assertNever: never = v;
  return _assertNever;
};

// typescript assertion functions

function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertDate(value: unknown): asserts value is Date {
  if (!(value instanceof Date)) throw new Error(message);
}

// typescript does not support function overloading, overloaded functions need to be compatible and have one implementation

// function overload declarations can be used to constrain function usage in typescript
function foverload(a: number): void;
function foverload(a: number, b: number, c: number): void;
function foverload(a: number, b?: number, c?: number): void {
  if (b == null && c == null) {
  } else {
  }
}

// function signatures are (almost) equivalent

type aFun = <T>(v: number) => T;

type aFunType = {
  // can also include function overloads
  (v: number): string;
  (v: number, x: number): string;
  debugName?: string;
};

const fun1Type: aFunType = (v: number, x?: number): string => {
  // overload implementation
  return '';
};

interface aFunItf<T> {
  aFun(v: number): T;
}

// constructor type definitions

type PointCreator = new (x: number, y: number) => { x: number; y: number };

type PointCreator1 = { new (x: number, y: number): { x: number; y: number } };

const Point1: PointCreator = class {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
};

// abstract classes work similar to java

// readonly arrays and tuples
function reverseArray(input: readonly number[]): number[] {
  return input.slice().sort().reverse();
}

// making tuple immutable
type ReadOnlyTuple = readonly [number, number];

// force cast
const person33 = animals as unknown as Point3dD;

// as const type assertion
// converts all members to readonly and all arrays to readonly tuples
// as const can be also used to cast strings to literal type values

const ccc = {
  a: 1,
  b: [1, 2, 3],
} as const;

// ccc.b.unshift(1); // won't work since as const was used

// this "guards", asserts thath object has "value field"
function double(this: { value: number }): number {
  return (this.value = 2 * this.value);
}

// generic constraints

type NameFields = { fn: string; ln: string };

function fullN<T extends NameFields>(obj: T): T & { fullN: string } {
  return {
    ...obj,
    fullN: `${obj.fn} ${obj.ln}`,
  };
}

const fullN1 = fullN({ fn: 'a', ln: 'b' });
console.log(fullN1);

// in typescript typeof can be used on instances

const ce1 = {
  a: 0,
  b: 0,
};

type SomePoint = typeof ce1; // can be also used inline

const ce2: SomePoint = {
  a: 1,
  b: 2,
};

// lookup types, allow to get type of a field of some object
const ce4: SomePoint['a'] = 5;

// keyof type operator returns union of stings of key object types, T[Key] is just a lookup constraint

const funByKey = <T, Key extends keyof T>(v: T, k: Key): T[Key] => {
  return v[k];
};

console.log(funByKey(ce2, 'b'));

// conditional types, logic is run by tsc at compile type

type IsNumber<T> = T extends number ? 'number' : 'other'; // can add string, number, boolean, undefined, symbol, bigint, function, null* or object
// bigint literals have n suffix ex. 24n
// null* return 'object' in plain javascript

// infer typename at runtime
function numberType<T>(t: T): IsNumber<T> {
  return typeof t as IsNumber<T>;
}

// never is subtype of every type, it is useful in conditional types
export type NoEmpty<T> = T extends null | undefined ? never : T;
type Example1 = NoEmpty<string | null>; // is the same as NoEmpty<string> | NoEmpty<null> // T | never  implies T

// never in conditional type is a standard way of removing members from type unions

// conditional types inference

type UnboxArray<T> = T extends Array<infer TypeVar> ? TypeVar : T;

// recognize return type
type ReturnType<T> = T extends (...args: any) => infer R ? R : never; // this comes as part of typescript compiler

type Num = ReturnType<typeof double>;

// readonly types
type ReadOnly1<T, Key extends keyof T> = {
  // this also comes as part of typescript compiler
  readonly [_ in Key]: T[_];
};

type ReadOnly<T> = {
  // this also comes as part of typescript compiler
  readonly [_ in keyof T]: T[_];
};

// mapped types

export type Mapped<T> = {
  // make fields optional
  +readonly [P in keyof T]+?: T[P]; // - can be used instead of +, to remove modifier
};

// Partial<T> makes fields optional, is provided by typescript compiler

// template literals
const lit1: `Some ${string}` = 'Some 234'; // useful in jsx, supports user defined types

// built in
// Partial<T> // makes fields optional
// Required<T> // makes fields required
// Readonly<T> // makes fields readonly
// Record<K, V> // acts like type-safe map

// autocomplete literal values with primitives
type Padding = 'small' | 'medium' | 'large' | (string & {}); // string does not get "collapsed", autocomplete still works
const pad1: Padding = 'small';

// optional fields are not the same as for ex. string | undefined, since fields cannot be missing

// satisfies operator allows hinting type mechanism ex. {a: 1, b: 2} satisfies Point3, no need to add temporary type annotated variables

// PropertyKey; is provided by typescript compiler
// type PropertyKey = keyof any // string | number | symbol

// ThisType<T> utility

type Math = {
  double(): number;
};

export const math1: Math & ThisType<{ value: number }> = {
  double(): number {
    // then double does not have to have signature like double(this: { value: number})
    return this.value * 2;
  },
};
const obj1math = {
  value: 5,
  ...math1,
};

console.log(obj1math.double());

// Awaited<> utility // unwraps nested promise types

// there are string manipulation utilities like Uppercase<'aaaa'>

// typescript has builtin enums, although they are  considered anti-pattern (string enums are a bit better)
// 'enums' emulation in typescript, that allow to iterate over values
export const LoginMode = {
  device: 'device',
  email: 'email',
} as const;

export type LoginMode = keyof typeof LoginMode;
