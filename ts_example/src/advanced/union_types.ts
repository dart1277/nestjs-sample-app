type User = { username: string; mobile: number };
type Value = User['username' | 'mobile'];

type StrUnionType = `user-${Value}`;

type SnakeToCamel<Str> = Str extends `${infer First}_${infer Last}`
  ? `${First}${SnakeToCamel<Capitalize<Last>>}`
  : Str;

type SnakeToCamel1 = SnakeToCamel<'aaa_bbb_ccc' | 'ddd_eee_fff'>;

// never can be viewed as empty union, it does not distribute

// mapping union types
// extends unknown is always true
// type MapToUnion<T> = T extends unknown ? Modify<T> : never;

// these 2 are not equivalent
type Duplicate<T> = [T, T]; // performs concatenation / text replacement
type DistributiveDuplicate<T> = T extends unknown ? [T, T] : never; // it distributes union types (on "naked" union types only, see below)
type D1 = Duplicate<1 | 2 | 3>;
type D2 = DistributiveDuplicate<1 | 2 | 3>;

// keyof on unions

type ExtractKeys0<T> = keyof T; // returns intersection of keys
type ExtractKeys<T> = T extends unknown ? keyof T : never; // distributes first, returns all keys of both objects (with duplicates), these 2 "T"s are different

type EK1 = ExtractKeys0<{ a: 1; b: 1 } | { a: 1; c: 1 }>; // "a"
type EK2 = ExtractKeys<{ a: 1; b: 1 } | { a: 1; c: 1 }>; // "a" | "b" | "a" | "c"

// control distribution of union types
type Extends<A, B> = A extends B ? true : false;
type Res1 = Extends<'a' | 'b' | 'c', 'a' | 'b'>; // boolean true | false
// prevent typescript from distributing union types
type ExtendsToTuple<A, B> = [A] extends [B] ? true : false;
type Res2 = ExtendsToTuple<'a' | 'b' | 'c', 'a' | 'b'>;

// condition types and distribution rules
// condition types only distribute over "naked" type variables

type NT = string | number extends string ? true : false; // does not distribute this kind of union (literal)
type UnionWithNumber<U> = U | number;
type ISString<U> = UnionWithNumber<U> extends string ? true : false;
type IS = ISString<string>; // still does not have "naked generic"
// to fix this and make union distribute, convert to "naked" type

type ISString2<U> = U extends string ? true : false;
type IS2 = ISString2<string | number>; // now union is distributed

// utility functions for union types

type R1 = Extract<null | 1 | 'a', string>;
type R2 = Extract<'change' | 'onClick' | 'onLoad', `on${string}`>; // extract string with on prefix only

type R4 = Exclude<null | 1 | 'a', null>;
type R5 = Exclude<'change' | 'onClick' | 'onLoad', `on${string}`>;

// narrowing down union types
type Categories =
  | { c: 'a'; items: string[] }
  | { c: 'b'; items: string[] }
  | { c: 'c'; items: string[] };

type FilterCategory<Type, Category> = Type extends { c: Category }
  ? Type
  : never;

type FilteredCat = FilterCategory<Categories, 'a' | 'b'>;

type FilterUnion<Type, KeyName extends string, Category> = Type extends {
  [K in KeyName]: Category;
}
  ? Type
  : never;

// or

type FilterUnion2<Type, Category> = Type extends Category ? Type : never; // in this case type intersection would work as well

type FilterUnionRes = FilterUnion<Categories, 'c', 'a' | 'b'>;
type FilterUnionRes2 = FilterUnion2<Categories, { c: 'a' | 'b' }>;
