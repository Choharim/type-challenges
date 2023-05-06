// ============= Test Cases =============
import type { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>
];

type X1 = {
  a: () => 22;
  b: number;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: number;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };

// ============= Your Code Here =============

// 방법 1
type DeepReadonly<T> = {
  readonly [key in keyof T]: keyof T[key] extends never
    ? T[key]
    : DeepReadonly<T[key]>;
};

// 방법 2
// type DeepReadonly<T extends object> = T extends Function
//   ? T
//   : {
//       readonly [key in keyof T]: T[key] extends object
//         ? DeepReadonly<T[key]>
//         : T[key];
//     };

// 방법 3
// type DeepReadonly<T> = {
//   readonly [key in keyof T]: T[key] extends object
//     ? T[key] extends Function
//       ? T[key]
//       : DeepReadonly<T[key]>
//     : T[key];
// };
