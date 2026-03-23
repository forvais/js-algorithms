// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, it, expect } from 'vitest';

import { Queue } from '#datastructures/queue.js';

describe('queue', () => {
  it('pushes an element to the tail', () => {
    const q = new Queue<number>();

    q.push(5);
    expect(q.buffer).toStrictEqual([5]);

    q.push(2);
    expect(q.buffer).toStrictEqual([5, 2]);
  });

  it('pops an element from the head of a populated queue', () => {
    const q = new Queue<number>();

    q.push(5);
    q.push(2);

    expect(q.pop()).toBe(5);
    expect(q.buffer).toStrictEqual([2]);
  });

  it('pops an undefined from an empty queue', () => {
    const q = new Queue<number>();

    expect(q.pop()).toBeUndefined();
  });

  it('peeks from the head of the queue', () => {
    const q = new Queue<number>();
    q.push(1);
    q.push(2);

    expect(q.peek()).toBe(1);
  });
});
