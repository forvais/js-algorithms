import { Array } from '#datastructures/backends/Array.js';

/**
 * Interface defining the standard queue operations: enqueue (add to back), dequeue (remove from front), and peek (inspect front).
 *
 * Maintains FIFO ordering — elements are removed in the order they were added.
 */
export interface Queue<T> {
  /**
   * Adds an element to the back of the queue.
   *
   * Never fails — the element is always inserted successfully.
   */
  enqueue(el: T): void;

  /**
   * Removes and returns the element at the front of the queue (oldest inserted), undefined if the queue is empty.
   */
  dequeue(): T | undefined;

  /**
   * Returns (but does not remove) the element at the front of the queue, undefined if the queue is empty.
   */
  peek(): T | undefined;
}

/**
 * A queue implementation backed by a dynamic array (`Array`), optimized for FIFO operations via buffer shifts.
 */
export class ArrayQueue<T> extends Array<T> implements Queue<T> {
  /**
   * Adds an element to the back (tail) of the queue.
   */
  public enqueue(el: T) {
    this.buffer.push(el);
  }

  /**
   * Removes and returns the element at the front (head) of the queue, undefined if the queue is empty.
   */
  public dequeue() {
    const el = this.buffer[0];
    this._remove(0);
    return el;
  }

  /**
   * Returns (but does not remove) the element at the front (head) of the queue, undefined if the queue is empty.
   */
  public peek() {
    return this.buffer[0];
  }
}
