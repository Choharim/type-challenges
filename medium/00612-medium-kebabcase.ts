// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-a">, "-a">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

// ============= Your Code Here =============

type KebabCase<
  S extends string,
  Result extends string = ""
> = S extends `${infer First}${infer Rest}`
  ? First extends Lowercase<First>
    ? KebabCase<Rest, `${Result}${First}`>
    : KebabCase<
        Rest,
        `${Result}${Result extends "" ? "" : "-"}${Lowercase<First>}`
      >
  : Result;
