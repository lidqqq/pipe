import { AsyncReturnType, pipe, pipeSync } from '@/index';

function plus2(a: number) {
  return a + 2;
}
function n2s(a: number): string {
  return a.toString();
}
function s2arr(s: string): string[] {
  return [s];
}
function arr2set<T>(arr: T[]): Set<T> {
  return new Set(arr);
}
function set2map<T>(set: Set<T>): Map<string, T> {
  const arr = Array.from(set);
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    map.set(i.toString(), arr[i]);
  }
  return map;
}
async function a_plus2(n: number): Promise<number> {
  return n + 2;
}
async function a_n2s(n: AsyncReturnType<typeof a_plus2>): Promise<string> {
  return n.toString();
}
async function a_s2arr(s: AsyncReturnType<typeof a_n2s>): Promise<string[]> {
  return [s];
}
async function a_rr2set<T>(arr: T[]): Promise<Set<T>> {
  return new Set(arr);
}
async function a_set2map<T>(set: Set<T>): Promise<Map<string, T>> {
  const arr = Array.from(set);
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    map.set(i.toString(), arr[i]);
  }
  return map;
}

describe('sync: number of args', function () {
  it('one', function () {
    const main = pipeSync<typeof plus2>(plus2);
    const result = main(42);
    const expected = 44;
    expect(result).toEqual(expected);
  });
  it('two', function () {
    const main = pipeSync<typeof plus2, typeof n2s>(plus2, n2s);
    const result = main(42);
    const expected = '44';
    expect(result).toEqual(expected);
  });
  it('three', function () {
    const main = pipeSync<typeof plus2, typeof n2s, typeof s2arr>(
      plus2,
      n2s,
      s2arr
    );
    const result = main(42);
    const expected = expect.arrayContaining(['44']);
    expect(result).toEqual(expected);
  });
  it('four', function () {
    const main = pipeSync<
      typeof plus2,
      typeof n2s,
      typeof s2arr,
      typeof arr2set
    >(plus2, n2s, s2arr, arr2set);
    const result = main(42);
    const expected = new Set().add('44');
    expect(result).toEqual(expected);
  });
  it('five', function () {
    const main = pipeSync<
      typeof plus2,
      typeof n2s,
      typeof s2arr,
      typeof arr2set,
      typeof set2map
    >(plus2, n2s, s2arr, arr2set, set2map);
    const result = main(42);
    const expected = new Map().set('0', '44');
    expect(result).toEqual(expected);
  });
  it('over five', function () {
    const main = pipeSync(plus2, plus2, n2s, s2arr, arr2set, set2map);
    const result = main<number, Map<string, string>>(42);
    const expected = new Map().set('0', '46');
    expect(result).toEqual(expected);
  });
});

describe('async: number of args', function () {
  it('one', async function () {
    const main = pipe<typeof a_plus2>(a_plus2);
    const result = await main(42);
    const expected = 44;
    expect(result).toEqual(expected);
  });
  it('two', async function () {
    const main = pipe<typeof a_plus2, typeof a_n2s>(a_plus2, a_n2s);
    const result = await main(42);
    const expected = '44';
    expect(result).toBe(expected);
  });
  it('three', async function () {
    const main = pipe<typeof a_plus2, typeof a_n2s, typeof a_s2arr>(
      a_plus2,
      a_n2s,
      a_s2arr
    );
    const result = await main(42);
    const expected = ['44'];
    expect(result).toEqual(expect.arrayContaining(expected));
  });
  it('four', async function () {
    const main = pipe<
      typeof a_plus2,
      typeof a_n2s,
      typeof a_s2arr,
      typeof a_rr2set
    >(a_plus2, a_n2s, a_s2arr, a_rr2set);
    const result = await main(42);
    const expected = new Set().add('44');
    expect(result).toEqual(expected);
  });
  it('five', async function () {
    const main = pipe<
      typeof a_plus2,
      typeof a_n2s,
      typeof a_s2arr,
      typeof a_rr2set,
      typeof a_set2map
    >(a_plus2, a_n2s, a_s2arr, a_rr2set, a_set2map);
    const result = await main(42);
    const expected = new Map().set('0', '44');
    expect(result).toEqual(expected);
  });
});
