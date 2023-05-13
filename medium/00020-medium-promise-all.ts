// ============= Test Cases =============
import type { Equal, Expect } from "../test-utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
];

// ============= Your Code Here =============

// 방법 1.
type ArrayItem<T> = T extends PromiseLike<infer R> ? R : T;

declare function PromiseAll<T extends Array<unknown>>(
  values: readonly [...T]
): Promise<{ [key in keyof T]: ArrayItem<T[key]> }>;

// 방법 2. Await 유틸 타입 사용하기
// declare function PromiseAll<T extends Array<any>>(
//   values: readonly [...T]
// ): Promise<{ [key in keyof T]: Awaited<T[key]> }>;
