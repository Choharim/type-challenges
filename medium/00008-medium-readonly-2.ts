// ============= Test Cases =============
import type { Alike, Expect } from "../test-utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============

// 방법 1. Omit 유틸 타입 사용
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [key in K]: T[key];
} & Omit<T, K>;

// 방법 2. 유틸 타입 사용 X
type MyReadonly<T, K extends keyof T = keyof T> = {
  readonly [key in K]: T[key];
} & { [key in keyof T as key extends K ? never : key]: T[key] };
