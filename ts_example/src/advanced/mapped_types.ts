import { promisify } from 'node:util';
import Func = jest.Func;

type apiResponse = {
  product_name: 'some string';
  shop: { shop_name: 'some shop' };
};

type Camelize<T> = {
  [K in keyof T as CamelCase<K>]: T[K] extends object ? Camelize<T[K]> : T[K];
};

type CamelCase<S> = S extends `${infer P}_${infer R}`
  ? `${Lowercase<P>}${Capitalize<CamelCase<R>>}`
  : S;

type newApiResponse = Camelize<apiResponse>;

// mapped type examples
type AlphabetUnion = 'x' | 'y' | 'z';

type MappedExample1 = {
  [Letter in AlphabetUnion]: Letter;
};

type StringExample1 = {
  [Letter in AlphabetUnion]: `L: ${Letter}`;
};

type Person = {
  readonly name: string;
  age: number;
};

type UpdatedPerion = {
  -readonly [Prop in keyof Person]: Person[Prop] | undefined;
};

// mapped types with generics

type UpdatedObj<T> = {
  -readonly [Prop in keyof T]: T[Prop] | undefined;
};

type NullableValues<T> = {
  [Prop in keyof T]: T[Prop] | null;
};

type UpdatedPerson2 = UpdatedObj<Person>;

type NonNull<T> = Exclude<T, null>;

type NoNullValues<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

type NNV1 = NoNullValues<{ a: 1; b: number | null; c: string | null }>;

const nnv1t: NNV1 = { a: 1, b: 3, c: '1' };

type nnvtest2<T, U> = T extends U ? never : T;

type nvvtest2n = nnvtest2<string | null, null>;

// refining object keys

type ForBackend = { publicInfo: string; secretInfo: string };

type ExcludeKeys<T> = {
  // this is similar to built-in Omit function
  [K in Exclude<keyof T, `secret${string}`>]: T[K];
};

type ForFe1 = ExcludeKeys<ForBackend>;
type ForFe2 = Omit<ForBackend, `secret${string}`>;

// type functions work with arrays in similar way
type NullableArrays = NullableValues<string[]>;

// extracting objects by value

// ---------------------------------------------------------------------------------------------------

// omit every prop that is a function

type f1 = { (...args: any[]): any };

type f1t2 = { (_: number, __: string): string } extends f1 ? true : false;

//const f1t2v: f1t2 = false;

const f1t: f1 = (a: number) => {
  return 'aa';
};

type funT = {
  a: string;
  b: number;
  c: (_: number, __: string) => string;
};

type NotMapsToFunction<V> = Exclude<
  V,
  {
    (..._: any[]): any;
  }
>;

type OmitFunctionTypes<T> = {
  [K in keyof T]: [K, NotMapsToFunction<T[K]>];
};

type onlyAttrsTest = OmitFunctionTypes<funT>[keyof funT];

// type OmitNever<U extends [string, any]> = U[1] extends never ? never : U[0];

type OmitNever<T> = T extends unknown
  ? T extends [string, any]
    ? T[1] extends never
      ? never
      : T[0]
    : never
  : never;

type OmitNeverTest = OmitNever<['a', never] | ['b', 'string']>;
type OmitNeverTest2 = OmitNever<onlyAttrsTest>;

type NarrowObjectKeys<T, U extends keyof T> = {
  [K in U]: T[K];
};

/*type OmitFunctionTypesFromValuesTest1 = OmitFunctionTypesFromValues<
  funT,
  OmitNever<onlyAttrsTest>
>;*/

/*type OmitFunctionTypesFromValuesTest2 = OmitFunctionTypesFromValues<
  funT,
  OmitNever<OmitFunctionTypes<funT>[keyof funT]>
>;*/

type OmitFunTypes<T> = NarrowObjectKeys<
  T,
  OmitNever<OmitFunctionTypes<T>[keyof T]>
>;

type OmitFunctionTypesFromValuesTest3 = OmitFunTypes<funT>;

const onlyAttrsTestV: OmitFunctionTypesFromValuesTest3 = {
  a: '1',
  b: 2,
  /*  c: (a: number, b: string): string => {
      return b;
    },*/
};

/* Solution

type NotMapsToFunction<V> = Exclude<
  V,
  {
    (..._: any[]): any;
  }
>;

type OmitFunctionTypes<T> = {
  [K in keyof T]: [K, NotMapsToFunction<T[K]>];
};

type OmitNever<T> = T extends unknown
  ? T extends [string, any]
    ? T[1] extends never
      ? never
      : T[0]
    : never
  : never;
 
 type NarrowObjectKeys<T, U extends keyof T> = {
  [K in U]: T[K];
};
 
type OmitFunTypes<T> = NarrowObjectKeys<
  T,
  OmitNever<OmitFunctionTypes<T>[keyof T]>
>;

* */

// convert object to entries

type ConvertObjToEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

/*type FromEntries<List> = List extends [infer H, ...infer Tail]
  ? H extends [string, unknown]
    ? {[]}
    : never
  : [];*/

type GetKeys<T> = T extends unknown
  ? T extends [string, unknown]
    ? T[0]
    : never
  : never;

type testGetKeys0 = ConvertObjToEntries<funT>;
type testGetKeys1 = GetKeys<ConvertObjToEntries<funT>>;

type GetValueByKey<T, Key extends string | boolean | number> = T extends unknown
  ? T extends [Key, unknown]
    ? T[1]
    : never
  : never;
type testGetValues1 = GetValueByKey<ConvertObjToEntries<funT>, 'c'>;

type FromEntries<List> = {
  [K in GetKeys<List>]: GetValueByKey<List, K>;
};

type testFromEntries = FromEntries<ConvertObjToEntries<funT>>;

const testFromEntriesVal: testFromEntries = {
  a: '1',
  b: 2,
  c: (a: number, b: string): string => {
    return b;
  },
};

/*

type testConvObjToEntries = ConvertObjToEntries<funT>;
*/

// other solution

type FunctionType = (...args: any[]) => any;

type MapFunctionsToNever<T> = {
  [K in keyof T]: T[K] extends FunctionType ? never : T[K];
};

type ExcludeFunctionEntries<T> = T extends [any, never] ? never : T; // could exclude FunctionType entries as well, to reduce complexity
// or use builtin exclude
// type ExcludeFunctionEntries2<T> = Exclude<T, [any, FunctionType]>;

type RemoveFunctions<T> = FromEntries<
  ExcludeFunctionEntries<ConvertObjToEntries<MapFunctionsToNever<T>>>
>;

type testRemoveFunctions2 = RemoveFunctions<funT>;

// succinct solution
type RemoveByValue<T, ToBeRemoved> = FromEntries<
  Exclude<ConvertObjToEntries<T>, [any, ToBeRemoved]>
>;

type ExtractByValue<T, Target> = FromEntries<
  Extract<ConvertObjToEntries<T>, [any, Target]>
>;

// another "from entries"
type FromEntries2<T extends [any, any]> = {
  [K in T as K[0]]: K[1];
};

type testFromEntries2 = FromEntries2<ConvertObjToEntries<funT>>;

const testFromEntriesVal2: testFromEntries2 = {
  a: '1',
  b: 2,
  c: (a: number, b: string): string => {
    return b;
  },
};

// ---------------------------------------------------------------------------------------------------

// retaining property modifiers

type PersonForm = {
  name: FieldState;
  email?: FieldState;
};

type FieldState = {
  value: string;
  isValid: boolean;
};

type TransformForm<Form> = {
  [Field in keyof Form]: ExtractValue<Form[Field]>; // if additional key is added to union, all modifiers are lost
};

type TransformForm2<Form> = {
  [Field in keyof Form | 'c']: Field; // if additional key is added to union, all modifiers are lost
};

type ExtractValue<T> = T extends { value: infer V } ? V : never;

type Res1 = TransformForm<Required<PersonForm>>;
type Res2 = TransformForm2<PersonForm>; // all modifiers i.e. optional '?' are lost

// key remapping using as (has different role in map types), allows key remapping

type RenameProps<Obj> = {
  [Key in keyof Obj as `get${string & Key}`]: Obj[Key]; // as keyword only changes key names (labels), not values
};

type testRenameProps1 = RenameProps<PersonForm>;

// -----------------------------------

// complex type remapping

/*// DOES NOT WORK FOR SOME REASON

const categorized = {
  photo: [
    { category: 'photo', file: 'img1' },
    { category: 'photo', file: 'img2' },
  ],
  note: [
    { category: 'note', file: 'text1' },
    { category: 'note', file: 'text2' },
  ],
};

declare function categorize<T extends { category: string }>(
  elements: T[],
): Categorize<T>;

type Categorize<T extends { category: string }> = {
  [Obj in T as Obj['category']]: Obj[];
};

type CategorizeTest1 = Categorize<
  { category: 'photo'; file: 'img1' } | { category: 'photo'; file: 'img2' }
>;

const CategorizeTest1Val: CategorizeTest1 = categorized;*/

// using multiple property modifiers

type Original = { key1: 1; key2: 2; key3: 3 };

type result = PartialOptional<Original, 'key1' | 'key2'>;

type PartialOptional<T, U> = {
  [Key in Extract<keyof T, U>]?: T[Key];
} & {
  [Key in Exclude<keyof T, U>]: T[Key];
};
