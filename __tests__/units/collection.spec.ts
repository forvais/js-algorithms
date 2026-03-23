// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, it, expect } from 'vitest';

import { Collection } from '#datastructures/collection.js';

describe('collection', () => {
  it('tracks size', () => {
    const c = new Collection<number>();

    expect(c.size).toBe(0);

    c.buffer.push(5);
    expect(c.size).toBe(1);
  });

  it('reports emptiness', () => {
    const c = new Collection<number>();

    expect(c.isEmpty()).toBeTruthy();

    c.buffer.push(5);
    expect(c.isEmpty()).toBeFalsy();
  });

  it('clears the internal buffer', () => {
    const c = new Collection<number>();

    c.clear();
    expect(c.size).toBe(0);
  });

  it('is convertable to an array', () => {
    const c = new Collection<number>();

    c.buffer.push(1);
    c.buffer.push(2);
    c.buffer.push(3);

    const buf = c.toArray();
    expect(buf).toStrictEqual([1, 2, 3]);
  });

  it('is iterable', () => {
    const c = new Collection<number>();
    const results = [];

    c.buffer.push(1);
    c.buffer.push(2);
    c.buffer.push(3);

    for (const el of c) {
      results.push(el);
    }

    expect(results).toStrictEqual([1, 2, 3]);
  });
});
