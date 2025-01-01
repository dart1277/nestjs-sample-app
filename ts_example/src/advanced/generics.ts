import { Timestamp } from 'typeorm';
import { Key } from 'node:readline';
import { strict } from 'node:assert';

export const submitData = <D, R extends D & TimeStamp>(data: D): R => {
  return {
    ...data,
    timestamp: new Date(),
  } as R;
};

const data = [
  {
    id: 123,
    name: 'title !',
  },
];

const mappedUsers = data.map(submitData);

type User = { id: number; name: string };
type TimeStamp = {
  timestamp: Date;
};

const xx: User & TimeStamp = {
  id: 123,
  name: 'title !',
  timestamp: new Date(),
};

interface aUser {
  id: number;
  name: string;
}

interface aUserT extends aUser {
  timestamp: Date;
}

const auserttest: aUser & TimeStamp = {
  id: 123,
  name: 'title !',
  timestamp: new Date(),
};

// keyof

export function getObjKeys<T extends object, K extends keyof T>(obj: T): K[] {
  return Object.keys(obj) as K[]; // or Array<keyof T>
}

const oKeys = getObjKeys({ a: 1, b: '2' });

// inferring array of literals

type InferUnion<T> = T extends [infer H, ...infer L]
  ? H | InferUnion<L>
  : never;

type aType = InferUnion<['PENDING', 'FAILED', 'SUCCESS']>;

// infer from values in array
const buildStat = <T extends string>(stats: T[]) => {
  return stats;
};

const stats = buildStat(['PENDING', 'FAILED', 'SUCCESS']);

// narrowing types
type Post = {
  id: number;
  body: string;
  ts: Date;
};

const editPost = <Key extends keyof Post>(
  key: Key,
  value: Post[Key],
): Post[Key] => {
  if (key === 'ts') {
    return new Date() as Post[Key];
  }
  return value;
};

// return specific type of key

const myFunc = <T, U extends keyof T>(obj: T, key: U) => {
  return obj[key]; // as T[U];
};

const dataObj1 = {
  key1: true,
  key2: 'some string',
  key3: 123,
};

type testType1 = (typeof dataObj1)['key1' | 'key2' | 'key3'];
type testType2 = (typeof dataObj1)['key1'];

const mfTest1 = myFunc(dataObj1, 'key1');
const mfTest2 = myFunc(dataObj1, 'key2');
const mfTest3 = myFunc(dataObj1, 'key3');

// function overload - defaults
export const dataObj2 = {
  key1: 'a',
  key2: 'b',
} as const;

type DataObjType = typeof dataObj2;

type DataKeys = keyof DataObjType;

function getValue<T extends keyof DataObjType>(): DataObjType['key1'];
function getValue<T extends keyof DataObjType>(key: T): DataObjType[T];
function getValue<T extends DataKeys = 'key1'>(key?: T): DataObjType[T] {
  // or use concrete type without generics
  return dataObj2[key ?? 'key1'] as DataObjType[T];
}

const a = getValue('key1');
const b = getValue('key2');
const defaultValue = getValue(); //a
