// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, it, expect } from 'vitest';
import { MaxHeap, MinHeap } from '#datastructures/Heap.js';

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

  it('returns an array representation of the heap', () => {
    const h = new MaxHeap<number>();

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.toArray()).toStrictEqual([9, 8, 5, 2, 1]);
  });

  it('stays "ordered" after every insertion', () => {
    const h = new MaxHeap<number>();

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.nodes).toStrictEqual([9, 8, 5, 2, 1]);
  });

  it('stays "ordered" after every pop', () => {
    const h = new MaxHeap<number>();

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);
    h.pop();

    expect(h.nodes).toStrictEqual([8, 2, 5, 1]);
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

  it('returns an array representation of the heap', () => {
    const h = new MinHeap<number>();

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.toArray()).toStrictEqual([1, 2, 5, 8, 9]);
  });

  it('stays "ordered" after every insertion', () => {
    const h = new MinHeap<number>(); // min-heap

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);

    expect(h.nodes).toStrictEqual([1, 2, 8, 9, 5]);
  });

  it('stays "ordered" after every pop', () => {
    const h = new MinHeap<number>(); // min-heap

    h.push(5);
    h.push(2);
    h.push(8);
    h.push(9);
    h.push(1);
    h.pop();

    expect(h.nodes).toStrictEqual([2, 5, 8, 9]);
  });
});
