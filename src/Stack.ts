import type { Collection } from './types.js';

import { Array } from './backends/Array.js';

/**
 * Interface defining the standard stack operations: push (add to top), peek (inspect top), and pop (remove from top).
 *
 * Maintains LIFO ordering — the most recently added element is the first to be removed.
 */
interface Stack<T> extends Collection {
  /**
   * Adds an element to the top of the stack.
   *
   * Never fails — the element is always inserted successfully.
   */
  push(el: T): void;

  /**
   * Returns (but does not remove) the element at the top of the stack, undefined if the stack is empty.
   */
  peek(): T | undefined;

  /**
   * Removes and returns the element at the top of the stack (most recently added), undefined if the stack is empty.
   */
  pop(): T | undefined;
}

/**
 * A stack implementation backed by a dynamic array (`Array`), using the end of the buffer as the stack top.
 */
export class ArrayStack<T> extends Array<T> implements Stack<T> {
  /**
   * Adds an element to the top of the stack.
   */
  public push(el: T) {
    this.buffer.push(el);
  }

  /**
   * Returns (but does not remove) the element at the top of the stack, undefined if the stack is empty
   */
  public peek() {
    return this.buffer[this.buffer.length - 1];
  }

  /**
   * Removes and returns the element at the top of the stack, undefined if the stack is empty
   */
  public pop() {
    return this.buffer.pop();
  }
}
