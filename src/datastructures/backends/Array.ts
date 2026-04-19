import type { Collection } from '#datastructures/types.js';

/**
 * A collection using an array as the base data structure.
 */
export class Array<T> implements Collection, Iterable<T> {
  protected buffer: T[] = [];

  /**
   * Inserts an element at an index.
   */
  protected _insert(idx: number, el: T) {
    this.buffer.splice(idx, 0, el);
  }

  /**
   * Removes the element at index.
   */
  protected _remove(idx: number) {
    this.buffer.splice(idx, 1);
  }

  /**
   * Returns the size of the element.
   */
  public get size() {
    return this.buffer.length;
  }

  /**
   * Returns true if the array is empty.
   */
  public isEmpty() {
    return this.size === 0;
  }

  /**
   * Returns true if the array is empty, else false if it has at least one element.
   */
  public clear() {
    this.buffer.length = 0;
  }

  /**
   * Returns a copy of the internal buffer.
   */
  public toArray() {
    return structuredClone(this.buffer);
  }

  /**
   * Returns the buffer's iterator.
   */
  [Symbol.iterator](): Iterator<T> {
    return this.buffer.values();
  }
}
