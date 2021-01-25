type Pipe = {
  <T1 extends (...args: any) => any>(fn1: T1): (
    ...x: Parameters<T1>
  ) => ReturnType<T1>;
  <
    T1 extends (...args: any) => any,
    T2 extends (
      arg: ReturnType<T1> extends Promise<infer T1> ? T1 : never
    ) => any
  >(
    fn1: T1,
    fn2: T2
  ): (...x: Parameters<T1>) => ReturnType<T2>;
  <
    T1 extends (...args: any) => any,
    T2 extends (
      arg: ReturnType<T1> extends Promise<infer T1> ? T1 : never
    ) => any,
    T3 extends (
      arg: ReturnType<T2> extends Promise<infer T2> ? T2 : never
    ) => any
  >(
    fn1: T1,
    fn2: T2,
    fn3: T3
  ): (...x: Parameters<T1>) => ReturnType<T3>;
  <
    T1 extends (...args: any) => any,
    T2 extends (
      arg: ReturnType<T1> extends Promise<infer T1> ? T1 : never
    ) => any,
    T3 extends (
      arg: ReturnType<T2> extends Promise<infer T2> ? T2 : never
    ) => any,
    T4 extends (
      arg: ReturnType<T3> extends Promise<infer T3> ? T3 : never
    ) => any
  >(
    fn1: T1,
    fn2: T2,
    fn3: T3,
    fn4: T4
  ): (...x: Parameters<T1>) => ReturnType<T4>;
  <
    T1 extends (...args: any) => any,
    T2 extends (
      arg: ReturnType<T1> extends Promise<infer T1> ? T1 : never
    ) => any,
    T3 extends (
      arg: ReturnType<T2> extends Promise<infer T2> ? T2 : never
    ) => any,
    T4 extends (
      arg: ReturnType<T3> extends Promise<infer T3> ? T3 : never
    ) => any,
    T5 extends (
      arg: ReturnType<T4> extends Promise<infer T4> ? T4 : never
    ) => any
  >(
    fn1: T1,
    fn2: T2,
    fn3: T3,
    fn4: T4,
    fn5: T5
  ): (...x: Parameters<T1>) => ReturnType<T5>;
  (...args: ((...args: any) => any)[]): <Y, R>(x: Y) => Promise<R>;
};
type PipeSync = {
  <T1 extends (...args: any) => any>(fn1: T1): (
    ...x: Parameters<T1>
  ) => ReturnType<T1>;
  <T1 extends (...args: any) => any, T2 extends (arg: ReturnType<T1>) => any>(
    fn1: T1,
    fn2: T2
  ): (...x: Parameters<T1>) => ReturnType<T2>;
  <
    T1 extends (...args: any) => any,
    T2 extends (arg: ReturnType<T1>) => any,
    T3 extends (arg: ReturnType<T2>) => any
  >(
    fn1: T1,
    fn2: T2,
    fn3: T3
  ): (...x: Parameters<T1>) => ReturnType<T3>;
  <
    T1 extends (...args: any) => any,
    T2 extends (arg: ReturnType<T1>) => any,
    T3 extends (arg: ReturnType<T2>) => any,
    T4 extends (arg: ReturnType<T3>) => any
  >(
    fn1: T1,
    fn2: T2,
    fn3: T3,
    fn4: T4
  ): (...x: Parameters<T1>) => ReturnType<T4>;
  <
    T1 extends (...args: any) => any,
    T2 extends (arg: ReturnType<T1>) => any,
    T3 extends (arg: ReturnType<T2>) => any,
    T4 extends (arg: ReturnType<T3>) => any,
    T5 extends (arg: ReturnType<T4>) => any
  >(
    fn1: T1,
    fn2: T2,
    fn3: T3,
    fn4: T4,
    fn5: T5
  ): (...x: Parameters<T1>) => ReturnType<T5>;
  (...args: ((...args: any) => any)[]): <Y, R>(x: Y) => R;
};

const pipe: Pipe = (...fns: Function[]) => async (x: any) => {
  return await fns.reduce(async (a, cb) => {
    return await cb(await a);
  }, x);
};
const pipeSync: PipeSync = (...fns: Function[]) => (x: any) => {
  return fns.reduce((a, cb) => cb(a), x);
};

export { pipe, pipeSync };
