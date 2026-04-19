import type { Collection } from './types.js';

import { BinaryHeap, MaxHeap, MinHeap } from './Heap.js';

/**
 * A priority queue entry bundling a value with its numeric priority.
 *
 * Used internally to associate user values with heap-orderable priorities.
 */
export interface PriorityItem<T> {
  /** The stored element/value. */
  value: T,

  /** Numeric priority used for ordering (higher = higher priority in MaxHeapPriorityQueue). */
  priority: number,
}

/**
 * Interface defining the public API for a priority queue over type `T`.
 *
 * Supports insertion with explicit priority, and retrieval of the lowest or highest priority elements.
 * Does not expose priority directly—returns only values.
 */
interface PriorityQueue<T> extends Collection {
  /**
   * Inserts an element with a given priority into the queue.
   */
  insert(el: T, priority: number): void;

  /**
   * Removes and returns the next element from the queue, undefined if the queue is empty.
   */
  dequeue(): T | undefined;

  /**
   * Returns (but does not remove) the next element in the queue, undefined if the queue is empty.
   */
  peek(): T | undefined;

  /**
   * Returns all elements currently in the queue as an array, in pop/dequeue order.
   */
  toArray(): T[];
}

/**
 * Abstract base class implementing shared priority queue logic via a generic `BinaryHeap`.
 *
 * Wraps the heap in a `PriorityItem` layer to associate user values with priorities,
 * then delegates ordering decisions to the underlying heap's comparison function.
 *
 * Concrete subclasses (e.g., `MaxHeapPriorityQueue`) define whether higher or lower
 * priority numbers correspond to higher retrieval precedence.
 */
export abstract class HeapPriorityQueue<T> implements PriorityQueue<T> {
  /**
   * The internal heap storing `PriorityItem`s, ordered by their `priority` field.
   *
   * Protected so subclasses can inspect or extend if needed (e.g., for debugging).
   */
  public constructor(protected readonly heap: BinaryHeap<PriorityItem<T>>) { }

  /**
   * Inserts an element with a given priority into the queue.
   */
  public insert(el: T, priority: number) {
    this.heap.push({
      value: el,
      priority,
    });
  }

  /**
   * Removes and returns the element by priority, undefined if the queue is empty.
   */
  public dequeue() {
    return this.heap.pop()?.value;
  }

  /**
   * Returns (but does not remove) the element by priority, undefined if the queue is empty.
   */
  public peek() {
    return this.heap.peek()?.value;
  }

  /**
   * Returns the number of elements currently in the priority queue.
   */
  public get size() {
    return this.heap.size;
  }

  /**
   * Returns `true` if the priority queue contains no elements.
   */
  public isEmpty() {
    return this.heap.isEmpty();
  }

  /**
   * Removes all elements from the priority queue, leaving it empty.
   */
  public clear() {
    this.heap.clear();
  }

  /**
   * Returns a copy of all stored values in arbitrary order.
   *
   * Does not modify the queue; preserves internal heap structure.
   */
  public toArray() {
    return this.heap.toArray().map(t => t.value);
  }
}

/**
 * A priority queue where higher numeric priorities are dequeued first.
 *
 * Uses an underlying `MaxHeap` to ensure elements with larger `priority` values
 * emerge before those with smaller ones when calling `dequeue()` or `peek()`.
 */
export class MaxHeapPriorityQueue<T> extends HeapPriorityQueue<T> {
  /**
   * Creates a new priority queue backed by a max-heap.
   *
   * The heap is initialized with an empty array and configured to compare
   * `PriorityItem`s by their `priority` field (larger = higher precedence).
   */
  public constructor() {
    super(new MaxHeap<PriorityItem<T>>([], t => t.priority));
  }
}

/**
 * A priority queue where lower numeric priorities are dequeued first.
 *
 * Uses an underlying `MinHeap` to ensure elements with smaller `priority` values
 * emerge before those with larger ones when calling `dequeue()` or `peek()`.
 */
export class MinHeapPriorityQueue<T> extends HeapPriorityQueue<T> {
  /**
   * Creates a new priority queue backed by a min-heap.
   *
   * The heap is initialized with an empty array and configured to compare
   * `PriorityItem`s by their `priority` field (smaller = higher precedence).
   */
  public constructor() {
    super(new MinHeap<PriorityItem<T>>([], t => t.priority));
  }
}
