// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { vi, describe, it, expect } from 'vitest';

import { Heap, MaxHeap, MinHeap } from '#datastructures/heap.js';

describe('heap', () => {
  it('uses a comparator to sort values', () => {
    const comparator = vi.fn().mockResolvedValue(true);

    const h = new Heap<number>(comparator);

    h.push(5);
    h.push(2);

    expect(comparator).toHaveBeenCalledTimes(1);
  });

  it('pops the root element', () => {
    const h = new Heap<number>((a, b) => a < b); // max-heap

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.pop()).toBe(9);
  });
});

describe('max-heap', () => {
  it('pushes the largest element to the root', () => {
    const h = new MaxHeap<number>();

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.pop()).toBe(9);
  });

  it('stays "ordered" after every insertion', () => {
    const h = new MaxHeap<number>();

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.buffer).toStrictEqual([9, 8, 5, 2, 1]);
  });

  it('stays "ordered" after every pop', () => {
    const h = new MaxHeap<number>();

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);
    h.pop();

    expect(h.buffer).toStrictEqual([8, 2, 5, 1]);
  });
});

describe('min-heap', () => {
  it('pushes the smallest element to the root', () => {
    const h = new MinHeap<number>(); // min-heap

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.pop()).toBe(1);
  });

  it('stays "ordered" after every insertion', () => {
    const h = new MinHeap<number>(); // min-heap

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.buffer).toStrictEqual([1, 2, 8, 9, 5]);
  });

  it('stays "ordered" after every pop', () => {
    const h = new MinHeap<number>(); // min-heap

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);
    h.pop();

    expect(h.buffer).toStrictEqual([2, 5, 8, 9]);
  });
});
