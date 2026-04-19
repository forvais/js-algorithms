import { describe, it, expect } from 'vitest';
import { MaxHeapPriorityQueue } from '#datastructures/PriorityQueue.js';

describe('PriorityQueue', () => {
  describe('MaxHeapPriorityQueue', () => {
    it('inserts high priority items ahead of lower priority items', () => {
      const q = new MaxHeapPriorityQueue<number>();

      q.insert(1, 0);
      q.insert(3, 2);
      q.insert(2, 1);

      expect(q.toArray()).toStrictEqual([3, 2, 1]);
    });

    it('inserts lower priority items before higher priority items', () => {
      const q = new MaxHeapPriorityQueue<number>();

      q.insert(2, 1);
      q.insert(1, 0);

      expect(q.toArray()).toStrictEqual([2, 1]);
    });

    it('inserts the same priority items to the tail of the group\'s sequence', () => {
      const q = new MaxHeapPriorityQueue<number>();

      q.insert(3, 1);
      q.insert(2, 0);
      q.insert(1, 0);

      expect(q.toArray()).toStrictEqual([3, 1, 2]);
    });

    it('dequeues elements from the head', () => {
      const q = new MaxHeapPriorityQueue<number>();

      q.insert(3, 1);
      q.insert(1, 0);
      q.insert(2, 0);

      expect(q.dequeue()).toBe(3);
    });

    it('dequeues undefined from an empty queue', () => {
      expect((new MaxHeapPriorityQueue<number>()).dequeue()).toBeUndefined();
    });

    it('peeks the element from the head of the queue', () => {
      const q = new MaxHeapPriorityQueue<number>();

      q.insert(3, 1);
      q.insert(1, 0);
      q.insert(2, 0);

      expect(q.peek()).toBe(3);
    });
  });
});
