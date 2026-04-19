/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BinaryTree } from './backends/BinaryTree.js';

/**
 * A binary heap that uses a comparison function to order the elements in a binary tree.
 */
export abstract class BinaryHeap<T> extends BinaryTree<T> {
  public constructor(protected array: T[] = []) {
    super();

    this.nodes = array;
    this.heapify();
  }

  /**
   * Compares the value of two nodes, used primarily in Min and Max heaps.
   *
   * This may change in the future if more distinct types of heaps are added.
   */
  protected abstract compare(a: T, b: T): boolean;

  /**
   * Determines which child of the given parent index is the better candidate
   * according to the comparison function.
   *
   * - Returns the left child if it is the only child.
   * - Otherwise returns the child that wins the comparison.
   */
  private getTargetChild(parent: number) {
    const l = BinaryTree.left(parent);
    const r = BinaryTree.right(parent);
    const hasR = r < this.nodes.length;

    const lNode = this.nodes[l]!;
    const rNode = this.nodes[r]!;

    let targetNode: number | null = null;

    if (!hasR) {
      targetNode = l;
    } else if (this.compare(lNode, rNode)) {
      targetNode = l;
    } else if (!this.compare(lNode, rNode)) {
      targetNode = r;
    }

    return targetNode;
  }

  /**
   * Psudo-sorts the tree until it is a valid heap using the comparison function.
   */
  protected heapify() {
    for (let parent = BinaryTree.parent(this.nodes.length - 1); parent >= 0; parent--) {
      const targetNode = this.getTargetChild(parent);

      if (targetNode !== null && this.compare(this.nodes[targetNode]!, this.nodes[parent]!)) {
        this._swap(parent, targetNode);
        this.siftDown(targetNode);
      }
    }
  }

  /**
   * Moves a node up the heap by repeatedly comparing it with its parent and swapping if it has higher priority until the comparison function is satisfied.
   */
  protected siftUp(start = this.nodes.length - 1) {
    for (let node = start; node > 0;) {
      const parent = BinaryTree.parent(node);

      if (this.compare(this.nodes[node]!, this.nodes[parent]!)) {
        this._swap(node, parent);
        node = parent;
      } else {
        break;
      }
    }
  }

  /**
   * Moves a node down the heap by repeatedly comparing it with its children, picking the child chosen by the comparison function, then swapping with it until the comparison function is satisfied.
   */
  protected siftDown(start = 0) {
    for (let node = start; node <= BinaryTree.parent(this.nodes.length - 1);) {
      const targetNode = this.getTargetChild(node);
      if (targetNode === null) break;

      if (this.compare(this.nodes[targetNode]!, this.nodes[node]!)) {
        this._swap(node, targetNode);
      }

      node = targetNode;
    }
  }

  /**
   * Push a new element onto the heap.
   */
  public push(el: T) {
    this._addNode(el);
    if (this.nodes.length > 1) this.siftUp();
  }

  /**
   * Pops the root node, undefined if the heap is empty.
   */
  public pop() {
    const el = this.nodes[0];
    if (this.nodes.length > 0) {
      this._remove(0);
      this.siftDown();
    }
    return el;
  }

  /**
   * Returns the root node without modifying the heap.
   */
  public peek() {
    return this.nodes[0];
  }

  /**
   * Returns the heap as an array by repeatedly popping.
   *
   * The original heap is restored after popping is complete.
   */
  public toArray() {
    const arr = [];
    const origNodes = structuredClone(this.nodes);

    for (let _ = this.nodes.length; _ > 0; _--) {
      arr.push(this.pop()!);
    }

    this.nodes = origNodes;
    return arr;
  }
}

/**
 * A binary heap that orders elements by the larger element
 */
export class MaxHeap<T> extends BinaryHeap<T> {
  public constructor(
    array: T[] = [],
    private readonly selector: (a: T) => number = a => (a as number),
  ) {
    super(array);
  }

  protected compare(a: T, b: T) {
    return this.selector(a) > this.selector(b);
  }
}

/**
 * A binary heap that orders elements by the smaller element
 */
export class MinHeap<T> extends BinaryHeap<T> {
  public constructor(
    array: T[] = [],
    private readonly selector: (a: T) => number = a => (a as number),
  ) {
    super(array);
  }

  protected compare(a: T, b: T) {
    return this.selector(a) < this.selector(b);
  }
}
