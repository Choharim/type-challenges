// ============= Test Cases =============
import type { Alike, Expect } from "../test-utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

// ============= Your Code Here =============

// 방법 1
type Chainable<O extends object = {}> = {
  option<K extends string, V>(
    key: K extends keyof O ? never : K,
    value: V
  ): Chainable<Record<K, V> & Omit<O, K>>;
  get(): O;
};

// 방법 2
// type Chainable<T extends {} = {}> = {
//   option<Key extends string, Value>(
//     key: Key extends keyof T ? never : Key,
//     value: Value
//   ): Key extends keyof T
//     ? Chainable<Omit<T, Key> & Record<Key, Value>>
//     : Chainable<T & Record<Key, Value>>;
//   get(): T;
// };
