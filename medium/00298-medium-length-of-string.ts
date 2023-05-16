// ============= Test Cases =============
import type { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<StringLength<"">, 0>>,
  Expect<Equal<StringLength<"kumiko">, 6>>,
  Expect<Equal<StringLength<"reina">, 5>>,
  Expect<Equal<StringLength<"Sound! Euphonium">, 16>>
];

// ============= Your Code Here =============
type StringLength<
  S extends string,
  TempArray extends Array<string> = []
> = S extends `${infer First}${infer Rest}`
  ? StringLength<Rest, [...TempArray, First]>
  : TempArray["length"];
