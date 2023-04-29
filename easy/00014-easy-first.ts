// ============= Test Cases =============
import type { Equal, Expect } from "../test-utils";

type array = [3, 2, 1];

type cases = [
  Expect<Equal<First<array>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];

// ============= Your Code Here =============

// 방법 1
type First<T extends unknown[]> = T[number] extends never ? never : T[0];

// 방법 2.
// type First<T extends unknown[]> = T extends [] ? never : T[0];
