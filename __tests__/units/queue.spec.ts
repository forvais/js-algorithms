// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, it, expect } from 'vitest';

import { Queue, PriorityQueue } from '#datastructures/queue.js';

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

describe('priority-queue', () => {
  it('inserts high priority items ahead of lower priority items', () => {
    const q = new PriorityQueue<number>();

    q.insert(1, 0);
    q.insert(3, 2);
    q.insert(2, 1);

    expect(q.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('inserts lower priority items before higher priority items', () => {
    const q = new PriorityQueue<number>();

    q.insert(2, 1);
    q.insert(1, 0);

    expect(q.toArray()).toStrictEqual([2, 1]);
  });

  it('inserts the same priority items to the tail of the group\'s sequence', () => {
    const q = new PriorityQueue<number>();

    q.insert(3, 1);
    q.insert(1, 0);
    q.insert(2, 0);

    expect(q.toArray()).toStrictEqual([3, 1, 2]);
  });

  it('pops elements from the head', () => {
    const q = new PriorityQueue<number>();

    q.insert(3, 1);
    q.insert(1, 0);
    q.insert(2, 0);

    expect(q.pop()).toBe(3);
  });

  it('pops undefined from an empty queue', () => {
    expect((new PriorityQueue<number>()).pop()).toBeUndefined();
  });

  it('peeks the element from the head of the queue', () => {
    const q = new PriorityQueue<number>();

    q.insert(3, 1);
    q.insert(1, 0);
    q.insert(2, 0);

    expect(q.peek()).toBe(3);
  });
});
