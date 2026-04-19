// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, it, expect } from 'vitest';
import { ArrayQueue } from '#datastructures/Queue.js';

describe('Queue', () => {
  describe('ArrayQueue', () => {
    it('pushes an element to the tail', () => {
      const q = new ArrayQueue<number>();

      q.enqueue(5);
      expect(q.buffer).toStrictEqual([5]);

      q.enqueue(2);
      expect(q.buffer).toStrictEqual([5, 2]);
    });

    it('dequeues an element from the head of a populated queue', () => {
      const q = new ArrayQueue<number>();

      q.enqueue(5);
      q.enqueue(2);

      expect(q.dequeue()).toBe(5);
      expect(q.buffer).toStrictEqual([2]);
    });

    it('dequeues an undefined from an empty queue', () => {
      const q = new ArrayQueue<number>();

      expect(q.dequeue()).toBeUndefined();
    });

    it('peeks from the head of the queue', () => {
      const q = new ArrayQueue<number>();
      q.enqueue(1);
      q.enqueue(2);

      expect(q.peek()).toBe(1);
    });
  });
});
