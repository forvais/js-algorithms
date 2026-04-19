// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, it, expect } from 'vitest';

import { ArrayStack } from '#datastructures/Stack.js';

describe('Stack', () => {
  describe('ArrayStack', () => {
    it('pushes an element to the tail', () => {
      const s = new ArrayStack<number>();

      s.push(5);
      expect(s.buffer).toStrictEqual([5]);

      s.push(2);
      expect(s.buffer).toStrictEqual([5, 2]);
    });

    it('pops an element from the tail of a populated stack', () => {
      const s = new ArrayStack<number>();

      s.push(5);
      s.push(2);

      expect(s.pop()).toBe(2);
      expect(s.buffer).toStrictEqual([5]);
    });

    it('pops an undefined from an empty stack', () => {
      const s = new ArrayStack<number>();

      expect(s.pop()).toBeUndefined();
    });

    it('peeks from the tail of the stack', () => {
      const s = new ArrayStack<number>();
      s.push(1);
      s.push(2);

      expect(s.peek()).toBe(2);
    });
  });
});
